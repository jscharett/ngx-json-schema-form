import {
    apply, applyTemplates, mergeWith, move, Rule, Tree, url
} from '@angular-devkit/schematics';

import { strings } from '@angular-devkit/core';

import { setWidgetOptions } from '../utils';

import { Schema as WidgetComponentSchema } from './schema';

export function create(options: WidgetComponentSchema): Rule {
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

        // TODO: need to update module and index.ts to import/export new widget

        return mergeWith(templateSource);
    };
}
