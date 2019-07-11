import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { cloneDeep, isPlainObject } from 'lodash';

import { JSONSchema7 } from 'json-schema';

import { JsonSchemaFormService } from './json-schema-form.service';
import { LayoutItem } from './layout-item.data';
import { LayoutService } from './layout.service';
import { SchemaService } from './schema.service';

// * This library also validates input data by the user, using both validators on
// * individual controls to provide real-time feedback while the user is filling
// * out the form, and then validating the entire input against the schema when
// * the form is submitted to make sure the returned JSON data object is valid.
// *
// * This library is similar to, and mostly API compatible with:
// *
// * - JSON Schema Form's [Angular Schema Form]{@link http://schemaform.io} library for AngularJs
// *   [(examples)]{@link http://schemaform.io/examples/bootstrap-example.html}
// *
// * - Mozilla's [react-jsonschema-form]{@link https://github.com/mozilla-services/react-jsonschema-form} library for React
// *   [(examples)]{@link https://mozilla-services.github.io/react-jsonschema-form}
// *
// * - Joshfire's [JSON Form]{@link https://github.com/joshfire/jsonform} library for jQuery
// *   [(examples)]{@link http://ulion.github.io/jsonform/playground}
/**
 * NGX JSON Schema Form
 *
 * Root module of the NGX JSON Schema Form client-side library,
 * an Angular library which generates an HTML form from a JSON schema
 * structured data model and/or a JSON Schema Form layout description.
 *
 * This library depends on:
 *
 * - [Angular]{@link https://angular.io} (obviously)
 * - [lodash]{@link https://github.com/lodash/lodash}, JavaScript utility library
 * - [ajv]{@link https://github.com/epoberezkin/ajv}, Another JSON Schema validator
 * - [json-schema-traverse]{@link https://github.com/epoberezkin/json-schema-traverse}, JSON Schema Traverse
 *
 * In addition, the Example Playground also depends on:
 *
 * - [brace]{@link http://thlorenz.github.io/brace}, Browserified Ace editor
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        JsonSchemaFormService,
        LayoutService,
        SchemaService
    ],
    selector: 'jsf-json-schema-form',
    styles: [],
    templateUrl: './json-schema-form.component.html'
})
export class JsonSchemaFormComponent implements OnChanges, OnInit {
    /** JSON Schema used to validate form data */
    @Input() schema: JSONSchema7;
    /** Layout used to define how the form is rendered */
    @Input() layout: Array<LayoutItem>;

    private formInitialized = false;

    constructor(
        // private readonly jsf: JsonSchemaFormService,
        private readonly schemaService: SchemaService,
        readonly layoutService: LayoutService
    ) {}

    ngOnInit() {
        this.updateForm();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('schema')) {
            this.formInitialized = false;
        }
        this.updateForm();
    }

    /** Submits the form */
    submitForm(): void {
        // TODO
        console.warn(this);
    }

    trackByFn(index) {
        return index;
    }

    private updateForm(): void {
        if (!this.formInitialized) {
            this.initializeForm();
        }
    }

    private initializeForm(): void {
        this.initializeSchema();
        this.initializeLayout();
        this.formInitialized = true;
    }

    private initializeLayout(): void {
        this.layoutService.setLayout(cloneDeep(this.layout || ['*']));
    }

    private initializeSchema(): void {
        if (isPlainObject(this.schema)) {
            this.schemaService.schema = cloneDeep(this.schema);
        }
    }
}
