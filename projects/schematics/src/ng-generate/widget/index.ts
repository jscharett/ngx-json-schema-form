import {
    apply, applyTemplates, chain, mergeWith, move,
    Rule, Tree, url
} from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

import { getWorkspace } from '@schematics/angular/utility/config';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath } from '@schematics/angular/utility/project';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';


import { Schema as WidgetSchema } from './schema';

export function widget(options: WidgetSchema): Rule {
    return (tree: Tree) => {
        const workspace = getWorkspace(tree);

        // const workspaceConfig = tree.read('/angular.json');
        // if (!workspaceConfig) {
        //     throw new SchematicsException('Could not find Angular workspace configuration');
        // }

        // // convert workspace to string
        // const workspaceContent = workspaceConfig.toString();

        // // parse workspace string into JSON object
        // const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);

        if (!options.project) {
            options.project = workspace.defaultProject;
        }

        const project = <WorkspaceProject>workspace.projects[options.project as string];
        // const projectName = options.project as string;
        // const project = workspace.projects[projectName];
        // const projectType = project.projectType === 'application' ? 'app' : 'lib';

        // if (options.path === undefined) {
        //     options.path = `${project.sourceRoot}/${projectType}`;
        // }
        if (options.path === undefined) {
            options.path = buildDefaultPath(project);
        }

        options.module = findModuleFromOptions(tree, options);

        const parsedPath = parseName(options.path as string, options.name);
        options.name = parsedPath.name;
        options.path = parsedPath.path;

        const templateSource = apply(url('./files'), [
            applyTemplates({
                ...strings,
                ...options
            }),
            move(parsedPath.path)
        ]);

        // TODO: need to update json-schema-form-module.ts and index.ts to import/export new widget

        return chain([
            mergeWith(templateSource)
        ]);
    };
}
