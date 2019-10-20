import { WidgetOptions } from '../utils';

export interface Schema extends WidgetOptions {
    // When true, creates the new files at the top level of the current project.
    flat?: boolean;
}
