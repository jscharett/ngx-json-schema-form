import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ButtonModule } from './button/button.module';
import { ContainerModule } from './container/container.module';
import { CoreModule } from './core/core.module';
import { FormModule } from './form/form.module';
import { HiddenModule } from './hidden/hidden.module';
import { SelectWidgetModule } from './select-widget/select-widget.module';
import { TemplateModule } from './template/template.module';

const MODULES = [
    ButtonModule, ContainerModule, CoreModule, FormModule,
    HiddenModule, SelectWidgetModule, TemplateModule
];

@NgModule({
    exports: [ ...MODULES ],
    imports: [
        CommonModule,
        ...MODULES
    ]
})
export class JsonSchemaFormModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: JsonSchemaFormModule,
            providers: [
                ...CoreModule.forRoot().providers
            ]
        };
    }
}
