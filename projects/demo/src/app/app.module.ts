import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule,
    MatMenuModule, MatSelectModule, MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { JsonSchemaFormModule } from '../../../ngx-json-schema-form/src/public-api';

import { AceEditorDirective } from './ace-editor.directive';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { RootComponent } from './root.component';

@NgModule({
    bootstrap: [ RootComponent ],
    declarations: [
        AceEditorDirective,
        AppComponent,
        RootComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule, FlexLayoutModule,
        MatButtonModule, MatCardModule, MatCheckboxModule,
        MatIconModule, MatMenuModule, MatSelectModule, MatToolbarModule,
        RouterModule.forRoot(routes),

        JsonSchemaFormModule
    ]
})
export class AppModule { }
