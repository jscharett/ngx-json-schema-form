/** Options for a particular Layout */
export interface LayoutOptions {
    /* Global HTML attributes */
    /** See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey} */
    accesskey?: string;
    /** See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class} */
    htmlClass?: string;
    /** See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/style} */
    style?: string;
    /** See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex} */
    tabindex?: number;
    /** See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title} */
    title?: string;

    /* Global HTML Input attributes */
    /** See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#dirname} */
    dirname?: boolean;
    /** See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#disabled} */
    disabled?: boolean;
    /** See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly} */
    readonly?: boolean;

    /* Attribute for setting a icon */
    icon?: {
        /** See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image#alt} */
        alt?: string;
        /** See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image#height} */
        height?: number;
        /** See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image#src} */
        src: string;
        /** See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image#width} */
        width?: number;
    };

    /** Whether or not a details container widget is open */
    open?: boolean;
    /** Index of the tab to selected by default */
    selectedIndex?: number;

    [others: string]: any;
}
