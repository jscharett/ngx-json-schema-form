import { JSONSchema7 } from 'json-schema';
import { cloneDeep, defaultTo, isString, mapKeys, omit, pick, uniqueId } from 'lodash';
import { Once } from 'lodash-decorators';

import { LayoutItem } from '../interfaces/layout-item.data';
import { LayoutOptions } from '../interfaces/layout-options.data';
import { SchemaAnalyzer } from '../interfaces/schema-analyzer.data';

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
    /** LayoutNodes that are rendered as children on this node */
    private readonly childNodes: Array<LayoutNode>;

    /** Unique Identifier for the item */
    public readonly id: string = uniqueId('control');

    /**
     * @throws Will throw an error if there is no layout.type or schema.type
     */
    constructor(layoutItem: LayoutItem, schema?: JSONSchema7, childNodes?: Array<LayoutNode>) {
        if (!layoutItem.type && !(schema && schema.type)) {
            throw new Error('Missing "type"....');
        }
        this.layoutItem = layoutItem;
        this.schema = schema;
        this.childNodes = childNodes;
    }

    /**
     * Creates a LayoutNode
     * @param layoutItem - A LayoutItem presented by the user.  If a string is given, it is converted into a LayoutItem
     * @param schemaService - Service for looking up related Schema definition
     * @param childNodes - Layout children
     */
    public static create(layoutItem: LayoutItem | string, schemaAnalyzer: SchemaAnalyzer, childNodes: Array<LayoutNode>): LayoutNode {
        const item: LayoutItem = isString(layoutItem)
            ? {key: layoutItem}
            : layoutItem;
        const schema: JSONSchema7 = <JSONSchema7>schemaAnalyzer.dataPointerMap.get(LayoutNode.getPointer(item.key));

        return new LayoutNode(item, schema, childNodes);
    }

    /** Normalizes a key(object.path or json/path) to json path */
    public static getPointer(key: string): string {
        const pointer = defaultTo(key, '');

        return pointer.charAt(0) === '/'
            ? pointer
            : `/${pointer.replace(/\./g, '/')}`;
    }
    /** Copy of the original layoutItem */
    get layoutDefinition(): LayoutItem {
        return cloneDeep(this.layoutItem);
    }
    /** Name for the item.  Will be used as the input[name] */
    get name(): string {
        return this.layoutItem.name || this.dataPointer.split('/').pop();
    }
    /** JSON path for accessing data for this layout item */
    get dataPointer(): string {
        return LayoutNode.getPointer(this.layoutItem.key);
    }
    /**
     * @todo Handle array of types from schema
     * Type of widget is used to represent the data
     */
    get type(): string {
        return this.layoutItem.type || <string>defaultTo(this.schema, <any>{}).type;
    }
    /** HTML template to be rendered inside the widget */
    get template(): string {
        return isString(this.layoutItem.template) ? this.layoutItem.template : undefined;
    }
    /** Options for the widget */
    get options(): LayoutOptions {
        return this.createOptions();
    }

    get items(): Array<LayoutNode> {
        return this.childNodes;
    }

    @Once() private createOptions(): LayoutOptions {
        return {
            ...pick(this.schema, ['title', 'description']),
            ...mapKeys(pick(this.schema, ['readOnly']), () => 'readonly'),
            ...omit(this.layoutItem, ['key', 'type', 'name', 'template', 'items', 'options']),
            ...defaultTo(this.layoutItem.options, {})
        };
    }

    // $ref?: any;
    // arrayItem?;
    // arrayItemType?;
    // dataType?;
    // recursiveReference?;

}
