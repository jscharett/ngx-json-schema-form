import {
    apply, applyTemplates, chain, mergeWith, move, Rule, Tree, url
} from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

import { /*addExportToIndex,*/ getWidgetOptions } from '../utils';

import { Schema as WidgetComponentSchema } from './schema';

export function create(options: WidgetComponentSchema): Rule {
    return (tree: Tree) => {
        const opts: WidgetComponentSchema = getWidgetOptions(tree, options) as WidgetComponentSchema;

        const templateSource = apply(url('./files'), [
            applyTemplates({
                ...strings,
                'if-flat': (s: string) => opts.flat ? '' : s,
                ...opts
            }),
            move(opts.path as string)
        ]);

        // TODO: need to update module and index.ts to import/export new widget

        return chain([
            // addDeclarationToNgModule(opts),
            // addExportToIndex(opts), // export { ${name}Component } from './${name}.component';
            mergeWith(templateSource)
        ]);
    };
}
