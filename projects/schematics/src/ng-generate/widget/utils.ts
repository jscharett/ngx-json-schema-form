import { Tree } from '@angular-devkit/schematics';

import { getWorkspace } from '@schematics/angular/utility/config';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath } from '@schematics/angular/utility/project';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';

export interface WidgetOptions {
    // The name of the widget.
    name: string;

    // The declaring NgModule.
    module?: string;

    // The path to create the widget.
    path?: string;

    // The name of the project.
    project?: string;
}

export function setWidgetOptions(tree: Tree, options: WidgetOptions) {
    const workspace = getWorkspace(tree);

    if (!options.project) {
        options.project = workspace.defaultProject;
    }

    const project = <WorkspaceProject>workspace.projects[options.project as string];
    if (options.path === undefined) {
        options.path = buildDefaultPath(project);
    }

    // throws error if run twice. First run modifies module to include path
    if (!options.module) {
        options.module = findModuleFromOptions(tree, options);
    }

    const parsedPath = parseName(options.path as string, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
}
