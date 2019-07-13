import { Injectable } from '@angular/core';

import { difference } from 'lodash';

import { JSONSchema7Definition } from 'json-schema';

import { LayoutItem } from './layout-item.data';
import { LayoutNode } from './layout-node';
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
        const schemaPointers: Map<string, JSONSchema7Definition> = this.schemaService.dataPointerMap;
        const mappedPointers: Set<string> = new Set<string>();
        let starIndex = -1;

        const mappedLayout: Array<LayoutNode> =
            layout.reduce((currentLayout: Array<LayoutNode>, layoutItem: LayoutItem | string, i: number): Array<LayoutNode> => {
            let newLayout: Array<LayoutNode> = currentLayout;

            if (<string>layoutItem === '*') {
                starIndex = i;
            } else {
                try {
                    const layoutNode: LayoutNode = LayoutNode.create(layoutItem, this.schemaService);
                    mappedPointers.add(layoutNode.dataPointer);
                    newLayout = newLayout.concat(layoutNode);
                } catch (err) {
                    console.error('buildLayout error: Form layout element not recognized:');
                    console.error(layoutItem);
                }
            }

            return newLayout;
        }, []);

        if (starIndex !== -1) {
            const availablePointers: Array<string> = Array.from(schemaPointers.keys());
            mappedLayout.splice(starIndex, 0, ...this.buildLayout(difference(availablePointers, Array.from(mappedPointers))));
        }

        return mappedLayout;
    }
}
