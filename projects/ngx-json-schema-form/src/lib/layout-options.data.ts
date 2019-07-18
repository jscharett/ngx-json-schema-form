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

    icon?: {
        alt?: string;
        height?: number;
        src: string;
        width?: number;
    };

    [others: string]: any;
}
