import { LayoutOptions } from './layout-options.data';

/**  */
export interface LayoutItem {
    /** Object path to map this item to a data value */
    key?: string;
    /** Name for the item.  Will be used as the input[name] */
    name?: string;
    /**
     * Container for options to set on widgets.
     * NOTE: this is optional as any undeclared property will automatically be put into an options contianer
     */
    options?: LayoutOptions;
    /**
     * Specify what type of widget is used to represent the data.
     * If not is specified, the JSON Schema will be used to determine the most appropriate widget
     */
    type?: string;

    [others: string]: any;
}
