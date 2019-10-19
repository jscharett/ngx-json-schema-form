export interface Schema {
    // The name of the widget.
    name: string;

    // The path to create the widget.
    path?: string;

    // The name of the project.
    project?: string;

    // The declaring NgModule.
    module?: string;

    // When true, creates the new files at the top level of the current project.
    flat?: boolean;
}
