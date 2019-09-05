import { Injectable } from '@angular/core';

import { cloneDeep, difference, isString } from 'lodash';

import { JSONSchema7Definition } from 'json-schema';

import { LayoutItem } from '../../core/interfaces/layout-item.data';
import { LayoutNode } from '../../core/models/layout-node';

import { SchemaService } from './schema.service';

/** Provides services for handling layouts */
@Injectable()
export class LayoutService {
    private readonly mappedPointers: Set<string> = new Set<string>();
    private _layout: Array<LayoutNode> = [];
    /**
     * @param value - List of Layout Nodes to be displayed in the UI
     */
    get layout(): Array<LayoutNode> {
        return this._layout;
    }

    constructor(private readonly schemaService: SchemaService) {}

    public setLayout(value: Array<LayoutItem | string>): void {
        this.mappedPointers.clear();
        this._layout = this.buildLayout(this.deDupe(cloneDeep(value)));
    }

    /**
     * Remove duplicate references from the layout and get a listing of
     * referened dataPointers.  Datapointers will be used to replace the
     * instance of '*' if it exists.
     */
    private deDupe(layout: Array<LayoutItem | string>): Array<LayoutItem | string> {
        return layout.reduceRight((currentLayout: Array<LayoutItem | string>, layoutItem: LayoutItem | string) => {
            let key: string = isString(layoutItem) ? layoutItem : layoutItem.key;
            if (key) {
                key = LayoutNode.getPointer(key);
                if (!this.mappedPointers.has(key)) {
                    this.mappedPointers.add(key);
                    currentLayout.unshift(layoutItem);
                }
            } else if ((<LayoutItem>layoutItem).items) {
                (<LayoutItem>layoutItem).items = this.deDupe((<LayoutItem>layoutItem).items);
                currentLayout.unshift(layoutItem);
            } else {
                currentLayout.unshift(layoutItem);
            }

            return currentLayout;
        }, []);
    }

    private buildLayout(layout: Array<LayoutItem | string>): Array<LayoutNode> {
        return layout.reduce((currentLayout: Array<LayoutNode>, layoutItem: LayoutItem | string, i: number): Array<LayoutNode> => {
            let newLayout: Array<LayoutNode> = currentLayout;
            let childNodes: Array<LayoutNode>;

            if (<string>layoutItem === '*') {
                const schemaPointers: Map<string, JSONSchema7Definition> = this.schemaService.dataPointerMap;
                const availablePointers: Array<string> = Array.from(schemaPointers.keys());
                newLayout = newLayout.concat(...this.buildLayout(difference(availablePointers, Array.from(this.mappedPointers))));
            } else {
                if ((<LayoutItem>layoutItem).items) {
                    childNodes = this.buildLayout((<LayoutItem>layoutItem).items);
                }
                try {
                    const layoutNode: LayoutNode = LayoutNode.create(layoutItem, this.schemaService, childNodes);
                    newLayout = newLayout.concat(layoutNode);
                } catch (err) {
                    console.error('buildLayout error: Form layout element not recognized:');
                    console.error(layoutItem);
                }
            }

            return newLayout;
        }, []);
    }
}
