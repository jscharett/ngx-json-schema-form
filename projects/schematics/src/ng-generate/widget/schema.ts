export interface Schema {
    // The name of the widget.
    name: string;

    // The layout types associated with the widget
    types: Array<string>;

    // The path to create the widget.
    path?: string;

    // The name of the project.
    project?: string;

    // The declaring NgModule.
    module?: string;
}
