import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { FormModule } from './form/form.module';
import { WidgetLibraryModule } from './widget-library/widget-library.module';

@NgModule({
    exports: [ CoreModule, FormModule, WidgetLibraryModule ],
    imports: [ CommonModule, CoreModule, FormModule, WidgetLibraryModule ]
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
