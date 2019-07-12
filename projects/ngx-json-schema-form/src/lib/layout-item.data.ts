export interface LayoutBase {
    /** Name for the item.  Will be used as the input[name] */
    name?: string;
}
export interface LayoutNode extends LayoutBase {
    /** Unique Identifier for the item */
    id: string;
    /** JSON path for accessing data for this layout item */
    dataPointer?: string;
    /** Options for */
    options: any;
    /** Type of widget is used to represent the data */
    type: string;
    /** TODO */
    // $ref?: any;
    // arrayItem?;
    // arrayItemType?;
    // dataType?;
    // items?: Array<any>;
    // recursiveReference?;
}
/**  */
export interface LayoutItem extends LayoutBase {
    /** Object path to map this item to a data value */
    key?: string;
    /**
     * Specify what type of widget is used to represent the data.
     * If not is specified, the JSON Schema will be used to determine the most appropriate widget
     */
    type?: string;
}
