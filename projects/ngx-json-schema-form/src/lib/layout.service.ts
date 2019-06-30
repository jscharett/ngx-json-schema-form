import { Injectable } from '@angular/core';

import { clone, pick, uniqueId } from 'lodash';

import { LayoutItem } from './layout-item.data';

@Injectable()
export class LayoutService {
    private _layout: Array<any> = [];
    set layout(value: Array<any>) {
        this._layout = LayoutService.buildLayout(value);
    }
    get layout(): Array<any> {
        return this._layout;
    }

    private static buildLayout(layout: Array<LayoutItem>): Array<LayoutItem> {
        // let hasSubmitButton = !JsonPointer.get(jsf, '/formOptions/addSubmit');
        const formLayout: Array<LayoutItem> = LayoutService.mapLayout(layout, (layoutItem, index, layoutPointer) => {
            const newNode: LayoutItem = {
                id: uniqueId(),
                options: {},
                ...pick(layoutItem, ['key', 'type', 'name'])
            };
            // Dropped code to push invalid props into options
            // Dropped code to convert widget to type
            // Dropped code to convert options.legend to options.title

            return newNode;
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
    // } else if (JsonPointer.isJsonPointer(layoutItem)) {
    //   newNode.dataPointer = layoutItem;
    // } else if (isString(layoutItem)) {
    //   newNode.key = layoutItem;
    // } else {
    //   console.error('buildLayout error: Form layout element not recognized:');
    //   console.error(layoutItem);
    //   return null;
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
    private static mapLayout(layout: Array<LayoutItem>, fn: (v: any, i?: number, l?: any, p?: any) => LayoutItem,
        layoutPointer: string|Array<string> = '', rootLayout: Array<LayoutItem> = layout): Array<LayoutItem> {
        const indexPad = 0;

        return layout.reduce((mappedLayout: Array<LayoutItem>, item: LayoutItem, index: number) => {
            const realIndex: number = +index + indexPad;
            const newLayoutPointer = `${layoutPointer}/${realIndex}`;
            let newNode: LayoutItem = clone(item);
            let newLayout: Array<LayoutItem> = mappedLayout;
            // Note: removed logic to convert tabs to items and items to [items]
            // if (item.items) {
            //     newNode.items = LayoutService.mapLayout(item.items, fn, `${newLayoutPointer}/items`, rootLayout);
            // }
            newNode = fn(newNode, realIndex, newLayoutPointer, rootLayout);
            // if (isNil(newNode)) {
            //     indexPad -= 1;
            // } else {
            //     if (Array.isArray(newNode)) { indexPad += newNode.length - 1; }
                newLayout = mappedLayout.concat(newNode);
            // }

            return newLayout;
        }, []);
    }
}
