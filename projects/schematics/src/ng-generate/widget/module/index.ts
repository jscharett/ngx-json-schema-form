import { normalize, strings } from '@angular-devkit/core';
import {
    apply,
    applyTemplates,
    chain,
    mergeWith,
    move,
    Rule,
    SchematicsException,
    Tree,
    url
} from '@angular-devkit/schematics';

import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';

import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { buildRelativePath } from '@schematics/angular/utility/find-module';

import { setWidgetOptions } from '../utils';

import { Schema as ModuleOptions } from './schema';

function buildRelativeModulePath(options: ModuleOptions, modulePath: string): string {
    const dasherizedName = strings.dasherize(options.name);
    const importModulePath = normalize(`/${options.path}/${(options.flat ? '' : `${dasherizedName}/`)}${dasherizedName}.module`);

    return buildRelativePath(modulePath, importModulePath);
}

function addDeclarationToNgModule(options: ModuleOptions): Rule {
    return (tree: Tree) => {
        if (options.module) {
            const modulePath = options.module;

            const text = tree.read(modulePath);
            if (text === null) {
                throw new SchematicsException(`File ${modulePath} does not exist.`);
            }
            const sourceText = text.toString();
            const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

            const relativePath = buildRelativeModulePath(options, modulePath);
            const changes = addImportToModule(source,
                                            modulePath,
                                            strings.classify(`${options.name}Module`),
                                            relativePath);

            const recorder = tree.beginUpdate(modulePath);
            for (const change of changes) {
                if (change instanceof InsertChange) {
                    recorder.insertLeft(change.pos, change.toAdd);
                }
            }
            tree.commitUpdate(recorder);
        }

        return tree;
    };
}

export function create(options: ModuleOptions): Rule {
    return (tree: Tree) => {
        setWidgetOptions(tree, options);

        const templateSource = apply(url('./files'), [
            applyTemplates({
                ...strings,
                'if-flat': (s: string) => options.flat ? '' : s,
                ...options
            }),
            move(options.path as string)
        ]);

        return chain([
            addDeclarationToNgModule(options),
            // TODO - addExportToIndex(options),
            mergeWith(templateSource)
        ]);
    };
}
