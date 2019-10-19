import {
    apply, applyTemplates, mergeWith, move, Rule, Tree, url
} from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

import { getWorkspace } from '@schematics/angular/utility/config';
// import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath } from '@schematics/angular/utility/project';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';

import { Schema as WidgetComponentSchema } from './schema';

export function create(options: WidgetComponentSchema): Rule {
    return (tree: Tree) => {
        const workspace = getWorkspace(tree);

        if (!options.project) {
            options.project = workspace.defaultProject;
        }

        const project = <WorkspaceProject>workspace.projects[options.project as string];
        if (options.path === undefined) {
            options.path = buildDefaultPath(project);
        }

        // TODO - throws error
        // options.module = findModuleFromOptions(tree, options);

        const parsedPath = parseName(options.path as string, options.name);
        options.name = parsedPath.name;
        options.path = parsedPath.path;

        const templateSource = apply(url('./files'), [
            applyTemplates({
                ...strings,
                'if-flat': (s: string) => options.flat ? '' : s,
                ...options
            }),
            move(parsedPath.path)
        ]);

        // TODO: need to update module and index.ts to import/export new widget

        return mergeWith(templateSource);
    };
}
