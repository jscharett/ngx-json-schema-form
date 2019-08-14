import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule,
    MatInputModule, MatMenuModule, MatSelectModule, MatToolbarModule
} from '@angular/material';

import { AceEditorModule } from 'ng2-ace-editor';

import { JsonSchemaFormModule } from '../../../../ngx-json-schema-form/src/public-api';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';

@NgModule({
    declarations: [ DemoComponent ],
    imports: [
        CommonModule,
        DemoRoutingModule,
        FormsModule, FlexLayoutModule,

        MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule,
        MatInputModule, MatMenuModule, MatSelectModule, MatToolbarModule,

        AceEditorModule,

        JsonSchemaFormModule
    ]
})
export class DemoModule { }
