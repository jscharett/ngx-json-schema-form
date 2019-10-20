import { chain, Rule, schematic } from '@angular-devkit/schematics';

import { Schema as WidgetSchema } from './schema';

export function widget(options: WidgetSchema): Rule {
    return () => {
        return chain([
            schematic('widget-module', options),
            schematic('widget-component', options)// ,
            // schematic('widget-e2e', options),
            // schematic('widget-demo', options)
        ]);
    };
}
