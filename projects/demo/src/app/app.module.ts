import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule,
    MatInputModule, MatMenuModule, MatSelectModule, MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AceEditorModule } from 'ng2-ace-editor';

import { JsonSchemaFormModule } from '../../../ngx-json-schema-form/src/public-api';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { RootComponent } from './root.component';

@NgModule({
    bootstrap: [ RootComponent ],
    declarations: [
        AppComponent,
        RootComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, FlexLayoutModule,
        MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule,
        MatInputModule, MatMenuModule, MatSelectModule, MatToolbarModule,
        RouterModule.forRoot(routes),

        AceEditorModule,

        JsonSchemaFormModule
    ]
})
export class AppModule { }
