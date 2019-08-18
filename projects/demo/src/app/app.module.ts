import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { JsonSchemaFormModule } from 'ngx-json-schema-form';

import { routes } from './app.routes';
import { RootComponent } from './root.component';

@NgModule({
    bootstrap: [ RootComponent ],
    declarations: [
        RootComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule,

        RouterModule.forRoot(routes),

        JsonSchemaFormModule.forRoot()
    ]
})
export class AppModule { }
