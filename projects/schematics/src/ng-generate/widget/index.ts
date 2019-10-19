import { chain, Rule, schematic, Tree } from '@angular-devkit/schematics';

import { getWorkspace } from '@schematics/angular/utility/config';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath } from '@schematics/angular/utility/project';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';

import { Schema as WidgetSchema } from './schema';

export function widget(options: WidgetSchema): Rule {
    return (tree: Tree) => {
        const workspace = getWorkspace(tree);

        if (!options.project) {
            options.project = workspace.defaultProject;
        }

        const project = <WorkspaceProject>workspace.projects[options.project as string];
        if (options.path === undefined) {
            options.path = buildDefaultPath(project);
        }

        options.module = findModuleFromOptions(tree, options);

        const parsedPath = parseName(options.path as string, options.name);
        options.name = parsedPath.name;
        options.path = parsedPath.path;

        // TODO: need to update json-schema-form-module.ts and index.ts to import/export new widget

        return chain([
            schematic('widget-module', options),
            schematic('widget-component', options)// ,
            // schematic('widget-e2e', options),
            // schematic('widget-demo', options)
        ]);
    };
}
