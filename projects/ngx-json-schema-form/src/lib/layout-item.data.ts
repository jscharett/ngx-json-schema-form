/**  */
export interface LayoutItem {
    /** Name for the item.  Will be used as the input[name] */
    name?: string;
    /** Object path to map this item to a data value */
    key?: string;
    /**
     * Specify what type of widget is used to represent the data.
     * If not is specified, the JSON Schema will be used to determine the most appropriate widget
     */
    type?: string;

    [others: string]: any;
}
