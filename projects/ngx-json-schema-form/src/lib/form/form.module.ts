import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { JsonSchemaFormComponent } from './json-schema-form.component';

@NgModule({
    declarations: [ JsonSchemaFormComponent ],
    exports: [ JsonSchemaFormComponent ],
    imports: [ CommonModule, SharedModule ]
})
export class FormModule { }
