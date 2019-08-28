import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ButtonModule } from './button/button.module';
import { CoreModule } from './core/core.module';
import { FormModule } from './form/form.module';
import { HiddenModule } from './hidden/hidden.module';
import { SelectWidgetModule } from './select-widget/select-widget.module';

@NgModule({
    exports: [ ButtonModule, CoreModule, FormModule, HiddenModule, SelectWidgetModule ],
    imports: [
        CommonModule,
        ButtonModule, CoreModule, FormModule, HiddenModule, SelectWidgetModule
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
