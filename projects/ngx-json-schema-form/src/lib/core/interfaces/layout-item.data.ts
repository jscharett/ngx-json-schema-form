import { LayoutOptions } from './layout-options.data';

/** Properties used to specify how to layout a piece of data in the form */
export interface LayoutItem {
    /** Layout items to render for a container widget */
    items?: Array<LayoutItem | string>;
    /** HTML template for rendering custom buttons */
    content?: string;
    /** Object path to map this item to a data value */
    key?: string;
    /** Name for the item.  Will be used as the input[name] */
    name?: string;
    /**
     * Options to set on widgets.
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
