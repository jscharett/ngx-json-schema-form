import { JSONSchema7 } from 'json-schema';
import { cloneDeep, defaultTo, isString, mapKeys, omit, pick, uniqueId } from 'lodash';
import { Memoize } from 'lodash-decorators';

import { LayoutItem } from './layout-item.data';
import { LayoutOptions } from './layout-options.data';
import { SchemaService } from './schema.service';

/**
 * The LayoutNode contains the logic to parse a LayoutItem along with its Schema.
 * A LayoutNode acts, to some degree, as a proxy of the LayoutItem, augmenting data
 * as needed. This gives the system a specific api to work with while allowing the
 * user to pass in variable data, so a degree.
 */
export class LayoutNode {
    /** Reference to the user defined layout item */
    private readonly layoutItem: LayoutItem;
    /** Reference to the schema that pertains the layout */
    private readonly schema: JSONSchema7;

    /** Unique Identifier for the item */
    public readonly id: string = uniqueId('control');

    /**
     * @throws Will throw an error if there is no layout.type or schema.type
     */
    constructor(layoutItem: LayoutItem, schema?: JSONSchema7) {
        if (!layoutItem.type && !(schema && schema.type)) {
            throw new Error('Missing "type"....');
        }
        this.layoutItem = layoutItem;
        this.schema = schema;
    }

    /**
     * Creates a LayoutNode
     * @param layoutItem - A LayoutItem presented by the user.  If a string is given, it is converted into a LayoutItem
     * @param schemaService - Service for looking up related Schema definition
     */
    public static create(layoutItem: LayoutItem | string, schemaService: SchemaService): LayoutNode {
        const item: LayoutItem = isString(layoutItem)
            ? {key: layoutItem}
            : layoutItem;
        const schema: JSONSchema7 = <JSONSchema7>schemaService.dataPointerMap.get(LayoutNode.getPointer(item.key));

        return new LayoutNode(item, schema);
    }

    /** Normalizes a key(object.path or json/path) to json path */
    private static getPointer(key: string): string {
        const pointer = defaultTo(key, '');

        return pointer.charAt(0) === '/'
            ? pointer
            : `/${pointer.replace(/\./g, '/')}`;
    }
    /** Copy of the original layoutItem */
    @Memoize() get layoutDefinition(): LayoutItem {
        return cloneDeep(this.layoutItem);
    }
    /** Name for the item.  Will be used as the input[name] */
    @Memoize() get name(): string {
        return this.layoutItem.name || this.dataPointer.split('/').pop();
    }
    /** JSON path for accessing data for this layout item */
    @Memoize() get dataPointer(): string {
        return LayoutNode.getPointer(this.layoutItem.key);
    }
    /**
     * @todo Handle array of types from schema
     * Type of widget is used to represent the data
     */
    @Memoize() get type(): string {
        return this.layoutItem.type || <string>defaultTo(this.schema, <any>{}).type;
    }
    /** HTML content to be rendered inside the widget */
    @Memoize() get content(): string {
        return isString(this.layoutItem.content) ? this.layoutItem.content : undefined;
    }
    /** Options for the widget */
    @Memoize() get options(): LayoutOptions {
        return {
            ...pick(this.schema, ['title', 'description']),
            ...mapKeys(pick(this.schema, ['readOnly']), () => 'readonly'),
            ...omit(this.layoutItem, ['key', 'type', 'name', 'content', 'options']),
            ...defaultTo(this.layoutItem.options, {})
        };
    }

    // $ref?: any;
    // arrayItem?;
    // arrayItemType?;
    // dataType?;
    // items?: Array<any>;
    // recursiveReference?;

}
