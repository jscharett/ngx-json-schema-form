import { WidgetOptions } from '../utils';

export interface Schema extends WidgetOptions {
    // The layout types associated with the widget
    types: Array<string>;

    // When true, creates the new files at the top level of the current project.
    flat?: boolean;
}
