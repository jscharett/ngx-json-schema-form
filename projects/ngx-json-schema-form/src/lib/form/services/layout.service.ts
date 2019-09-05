import { Injectable } from '@angular/core';

import { difference } from 'lodash';

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
        this._layout = this.buildLayout(value);
    }

    private buildLayout(layout: Array<LayoutItem | string>): Array<LayoutNode> {
        const schemaPointers: Map<string, JSONSchema7Definition> = this.schemaService.dataPointerMap;
        let starIndex = -1;

        const mappedLayout: Array<LayoutNode> =
            layout.reduce((currentLayout: Array<LayoutNode>, layoutItem: LayoutItem | string, i: number): Array<LayoutNode> => {
            let newLayout: Array<LayoutNode> = currentLayout;
            let childNodes: Array<LayoutNode>;

            if (<string>layoutItem === '*') {
                starIndex = i;
            } else {
                if ((<LayoutItem>layoutItem).items) {
                    childNodes = this.buildLayout((<LayoutItem>layoutItem).items);
                }
                try {
                    const layoutNode: LayoutNode = LayoutNode.create(layoutItem, this.schemaService, childNodes);
                    this.mappedPointers.add(layoutNode.dataPointer);
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
            mappedLayout.splice(starIndex, 0, ...this.buildLayout(difference(availablePointers, Array.from(this.mappedPointers))));
        }

        return mappedLayout;
    }
}
