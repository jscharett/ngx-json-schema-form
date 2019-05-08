import { NgModule } from '@angular/core';

import { WidgetLibraryModule } from './widget-library/widget-library.module';

import { JsonSchemaFormComponent } from './json-schema-form.component';

@NgModule({
    declarations: [ JsonSchemaFormComponent ],
    exports: [ JsonSchemaFormComponent, WidgetLibraryModule ],
    imports: [ WidgetLibraryModule ]
})
export class JsonSchemaFormModule { }
