import {
    apply, applyTemplates, chain, mergeWith, move,
    Rule, SchematicsException, Tree, url
} from '@angular-devkit/schematics';

import { experimental, normalize, strings } from '@angular-devkit/core';

import { Schema as WidgetSchema } from './schema';

export function widget(options: WidgetSchema): Rule {
    return (tree: Tree) => {
        const workspaceConfig = tree.read('/angular.json');
        if (!workspaceConfig) {
            throw new SchematicsException('Could not find Angular workspace configuration');
        }

        // convert workspace to string
        const workspaceContent = workspaceConfig.toString();

        // parse workspace string into JSON object
        const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);

        if (!options.project) {
            options.project = workspace.defaultProject;
        }

        const projectName = options.project;
        const project = workspace.projects[projectName];
        const projectType = project.projectType === 'application' ? 'app' : 'lib';

        if (options.path === undefined) {
            options.path = `${project.sourceRoot}/${projectType}`;
        }

        const templateSource = apply(url('./files'), [
            applyTemplates({
                classify: strings.classify,
                dasherize: strings.dasherize,
                name: options.name,
                types: options.types
            }),
            move(normalize(options.path))
        ]);

        // TODO: need to update json-schema-form-module.ts and index.ts to import/export new widget

        return chain([
            mergeWith(templateSource)
        ]);
    };
}
