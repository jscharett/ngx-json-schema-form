[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/ngx-json-schema-form.svg)](https://www.npmjs.com/package/ngx-json-schema-form)
[![npm downloads](https://img.shields.io/npm/dm/ngx-json-schema-form.svg)](https://www.npmjs.com/package/ngx-json-schema-form)
[![Build Status](https://travis-ci.org/jscharett/ngx-json-schema-form.svg?branch=master)](https://travis-ci.org/jscharett/ngx-json-schema-form)
[![codecov](https://codecov.io/gh/jscharett/ngx-json-schema-form/branch/master/graph/badge.svg)](https://codecov.io/gh/jscharett/ngx-json-schema-form)
[![Dependencies](https://david-dm.org/jscharett/ngx-json-schema-form.svg)](https://david-dm.org/jscharett/ngx-json-schema-form)
[![devDependencies](https://david-dm.org/jscharett/ngx-json-schema-form/dev-status.svg)](https://david-dm.org/jscharett/ngx-json-schema-form?type=dev)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](code-of-conduct.md)

# NgxJsonSchemaForm

A [JSON Schema](http://json-schema.org) Form builder for Angular 7+, similar to

  * [Angular JSON Schema Form](https://github.com/angular2-json-schema-form)'s 

Note: This project attemtps to take over where its predecesor left off.
It's based off of the above project, but rewritten from the ground up.

Note: This project is not ready for consumption.  There is still a lot to do to
bring parity with [Angular JSON Schema Form](https://github.com/angular2-json-schema-form)

## Check out the live demo and play with the examples

[Check out some examples here.](https://jscharett.github.io/ngx-json-schema-form/)

## Using Angular JSON Schema Form

### Basic use

Begin by installing the library in your project

```
npm install ngx-json-schema-form --save
```

Then import JsonSchemaFormModule in your main application module:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { JsonSchemaFormModule } from 'ngx-json-schema-form';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [ AppComponent ],
    imports: [
        BrowserModule,
        JsonSchemaFormModule.forRoot()
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
```

To display a form in your Angular component, simply add the following to your component's template:

```html
<json-schema-form
    [schema]="schema"
></json-schema-form>
```

Where `schema` is a valid JSON schema object. If you don't already have your own schemas, you can find a bunch of samples to test with in the `projects/demo/src/assets/examples` folder.
