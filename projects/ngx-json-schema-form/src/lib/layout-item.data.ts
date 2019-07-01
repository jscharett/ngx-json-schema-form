/**  */
export interface LayoutItem {
    /** Unique Identifier for the item */
    id: string;
    /** Options for */
    options: any;
    /** TODO */
    $ref?: any;
    // arrayItem?;
    // arrayItemType?;
    // dataPointer?;
    // dataType?;
    /** TODO */
    items?: Array<any>;
    /** Data pointer to map this item to a data value */
    key?: string;
    /** Name for the item.  Will be used as the input[name] */
    name?: string;
    // recursiveReference?;
    /**
     * Specify what type of widget is used to represent the data.
     * If not is specified, the JSON Schema will be used to determine the most appropriate widget
     */
    type?: string;
}
