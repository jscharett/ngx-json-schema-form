import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { WidgetLibraryModule } from './widget-library/widget-library.module';

import { JsonSchemaFormComponent } from './json-schema-form.component';

@NgModule({
    declarations: [ JsonSchemaFormComponent ],
    exports: [ JsonSchemaFormComponent, CoreModule, WidgetLibraryModule ],
    imports: [ CommonModule, CoreModule, WidgetLibraryModule ]
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
