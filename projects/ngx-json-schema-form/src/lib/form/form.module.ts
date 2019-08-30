import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SelectWidgetModule } from '../select-widget/select-widget.module';
import { JsonSchemaFormComponent } from './json-schema-form.component';

@NgModule({
    declarations: [ JsonSchemaFormComponent ],
    exports: [ JsonSchemaFormComponent ],
    imports: [
        CommonModule, SelectWidgetModule
    ]
})
export class FormModule { }
