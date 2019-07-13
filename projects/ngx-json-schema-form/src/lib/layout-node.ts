import { JSONSchema7 } from 'json-schema';
import { defaultTo, isString, omit, uniqueId } from 'lodash';
import { Memoize } from 'lodash-decorators';

import { LayoutItem } from './layout-item.data';
import { SchemaService } from './schema.service';

export class LayoutNode {
    private readonly layoutItem: LayoutItem;
    private readonly schema: JSONSchema7;

    /** Unique Identifier for the item */
    public readonly id: string = uniqueId('control');

    constructor(layoutItem: LayoutItem, schema?: JSONSchema7) {
        if (!layoutItem.type && !(schema && schema.type)) {
            throw new Error('Missing "type"....');
        }
        this.layoutItem = layoutItem;
        this.schema = schema;
    }

    public static create(layoutItem: LayoutItem | string, schemaService: SchemaService): LayoutNode {
        const item: LayoutItem = isString(layoutItem)
            ? {key: layoutItem}
            : layoutItem;
        const schema: JSONSchema7 = <JSONSchema7>schemaService.dataPointerMap.get(LayoutNode.getPointer(item.key));

        return new LayoutNode(item, schema);
    }

    private static getPointer(key: string): string {
        const pointer = defaultTo(key, '');

        return pointer.charAt(0) === '/'
            ? pointer
            : `/${pointer.replace(/\./g, '/')}`;
    }
    /** Name for the item.  Will be used as the input[name] */
    @Memoize() get name(): string {
        return this.layoutItem.name || this.dataPointer.split('/').pop();
    }
    /** JSON path for accessing data for this layout item */
    @Memoize() get dataPointer(): string {
        return LayoutNode.getPointer(this.layoutItem.key);
    }
    /** Type of widget is used to represent the data */
    @Memoize() get type(): string {
        // TODO: handle array of types
        return this.layoutItem.type || <string>defaultTo(this.schema, <any>{}).type;
    }
    /** Options for */
    @Memoize() get options(): {[others: string]: any} {
        return omit(this.layoutItem, ['key, type', 'name']);
    }

    // $ref?: any;
    // arrayItem?;
    // arrayItemType?;
    // dataType?;
    // items?: Array<any>;
    // recursiveReference?;

}
