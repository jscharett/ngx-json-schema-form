import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WidgetLibraryModule } from './widget-library/widget-library.module';

import { JsonSchemaFormComponent } from './json-schema-form.component';

@NgModule({
    declarations: [ JsonSchemaFormComponent ],
    exports: [ JsonSchemaFormComponent, WidgetLibraryModule ],
    imports: [ CommonModule, WidgetLibraryModule ]
})
export class JsonSchemaFormModule { }
