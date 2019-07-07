import { Injectable } from '@angular/core';

import { clone, difference, isPlainObject, isString, pick, uniqueId } from 'lodash';

import { JSONSchema7, JSONSchema7Definition } from 'json-schema';

import { LayoutItem, LayoutNode } from './layout-item.data';
import { SchemaService } from './schema.service';

/** Provides services for handling layouts */
@Injectable()
export class LayoutService {
    private _layout: Array<LayoutNode> = [];
    /**
     * @param value - List of Layout Nodes to be displayed in the UI
     */
    get layout(): Array<LayoutNode> {
        return this._layout;
    }

    constructor(private readonly schemaService: SchemaService) {}

    public setLayout(value: Array<LayoutItem | string>): void {
        this._layout = this.buildLayout(value);
    }

    private buildLayout(layout: Array<LayoutItem | string>): Array<LayoutNode> {
        // let hasSubmitButton = !JsonPointer.get(jsf, '/formOptions/addSubmit');
        const formLayout: Array<LayoutNode> = this.mapLayout(layout, (layoutItem: LayoutItem | string): LayoutNode => {
            const newNode: Partial<LayoutNode> = {
                id: uniqueId(),
                options: {}
            };
            if (isPlainObject(layoutItem)) {
                Object.assign(newNode, pick(layoutItem, ['type', 'name']));
                if ((<LayoutItem>layoutItem).key) {
                    newNode.dataPointer = (<LayoutItem>layoutItem).key.charAt(0) === '/'
                    ? (<LayoutItem>layoutItem).key
                    : `/${(<LayoutItem>layoutItem).key.replace(/\./g, '/')}`;
                }
            } else if (isString(layoutItem)) {
                newNode.dataPointer = (<string>layoutItem).charAt(0) === '/'
                    ? <string>layoutItem
                    : `/${(<string>layoutItem).replace(/\./g, '/')}`;
            } else {
                console.error('buildLayout error: Form layout element not recognized:');
                console.error(layoutItem);

                return;
            }
            // Dropped code to push invalid props into options
            // Dropped code to convert widget to type
            // Dropped code to convert options.legend to options.title

            return <LayoutNode>newNode;
    // if (isObject(layoutItem)) {

    //   if (!hasOwn(newNode.options, 'validationMessages')) {
    //     if (hasOwn(newNode.options, 'errorMessages')) {
    //       newNode.options.validationMessages = newNode.options.errorMessages;
    //       delete newNode.options.errorMessages;

    //     // Convert Angular Schema Form (AngularJS) 'validationMessage' to
    //     // Angular JSON Schema Form 'validationMessages'
    //     // TV4 codes from https://github.com/geraintluff/tv4/blob/master/source/api.js
    //     } else if (hasOwn(newNode.options, 'validationMessage')) {
    //       if (typeof newNode.options.validationMessage === 'string') {
    //         newNode.options.validationMessages = newNode.options.validationMessage;
    //       } else {
    //         newNode.options.validationMessages = {};
    //         Object.keys(newNode.options.validationMessage).forEach(key => {
    //           const code = key + '';
    //           const newKey =
    //             code ===  '0'  ? 'type' :
    //             code ===  '1'  ? 'enum' :
    //             code === '100' ? 'multipleOf' :
    //             code === '101' ? 'minimum' :
    //             code === '102' ? 'exclusiveMinimum' :
    //             code === '103' ? 'maximum' :
    //             code === '104' ? 'exclusiveMaximum' :
    //             code === '200' ? 'minLength' :
    //             code === '201' ? 'maxLength' :
    //             code === '202' ? 'pattern' :
    //             code === '300' ? 'minProperties' :
    //             code === '301' ? 'maxProperties' :
    //             code === '302' ? 'required' :
    //             code === '304' ? 'dependencies' :
    //             code === '400' ? 'minItems' :
    //             code === '401' ? 'maxItems' :
    //             code === '402' ? 'uniqueItems' :
    //             code === '500' ? 'format' : code + '';
    //           newNode.options.validationMessages[newKey] = newNode.options.validationMessage[key];
    //         });
    //       }
    //       delete newNode.options.validationMessage;
    //     }
    //   }
    // }
        });

        return formLayout;
    }

    /**
     * 'mapLayout' function
     *
     * Creates a new layout by running each element in an existing layout through
     * an iteratee. Recursively maps within array elements 'items' and 'tabs'.
     * The iteratee is invoked with four arguments: (value, index, layout, path)
     *
     * The returned layout may be longer (or shorter) then the source layout.
     *
     * If an item from the source layout returns multiple items (as '*' usually will),
     * this function will keep all returned items in-line with the surrounding items.
     *
     * If an item from the source layout causes an error and returns null, it is
     * skipped without error, and the function will still return all non-null items.
     *
     * @param  layout - the layout to map
     * @param  function - the funciton to invoke on each element
     * @param  layoutPointer - the layoutPointer to layout, inside rootLayout
     * @param  rootLayout - the root layout, which conatins layout
     * @return the mapped layout
     */
    private mapLayout(layout: Array<LayoutItem | string>,
        fn: (layoutItem: LayoutItem | string, index?: number, pointer?: string, p?: any) => LayoutNode,
        layoutPointer: string|Array<string> = '', rootLayout: Array<LayoutItem | string> = layout): Array<LayoutNode> {
        const indexPad = 0;
        const schemaPointers: Map<string, JSONSchema7Definition> = this.schemaService.dataPointerMap;
        const mappedPointers: Set<string> = new Set<string>();
        let starIndex = -1;

        const mappedLayout: Array<LayoutNode> = layout.reduce((currentLayout: Array<LayoutNode>, item: LayoutItem | string, i: number) => {
            let newLayout: Array<LayoutNode> = currentLayout;
            if (<string>item === '*') {
                starIndex = i;
            } else {
                const realIndex: number = +i + indexPad;
                const newLayoutPointer = `${layoutPointer}/${realIndex}`;
                // Note: removed logic to convert tabs to items and items to [items]
                // if (item.items) {
                //     newNode.items = LayoutService.mapLayout(item.items, fn, `${newLayoutPointer}/items`, rootLayout);
                // }
                const newNode: LayoutNode = fn(clone(item), realIndex, newLayoutPointer, rootLayout);
                if (newNode) {
                    if (!newNode.type && isPlainObject(schemaPointers.get(newNode.dataPointer))) {
                        // TODO: review getInputType() fn and handle missing functionality
                        newNode.type = <string>(<JSONSchema7>schemaPointers.get(newNode.dataPointer)).type;
                    }
                    if (newNode.type) {
                        mappedPointers.add(newNode.dataPointer);
                        newLayout = currentLayout.concat(newNode);
                    }
                }
            }
            // if (isNil(newNode)) {
            //     indexPad -= 1;
            // } else {
            //     if (Array.isArray(newNode)) { indexPad += newNode.length - 1; }
                // newLayout = currentLayout.concat(newNode);
            // }

            return newLayout;
        }, []);

        if (starIndex !== -1) {
            const availablePointers: Array<string> = Array.from(schemaPointers.keys());
            mappedLayout.splice(starIndex, 0, ...this.mapLayout(difference(availablePointers, Array.from(mappedPointers)), fn));
        }

        return mappedLayout;
    }
}
