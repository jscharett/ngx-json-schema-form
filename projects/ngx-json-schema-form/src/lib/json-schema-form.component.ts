import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { cloneDeep, isPlainObject } from 'lodash';

import { JSONSchema7 } from 'json-schema';

import { JsonSchemaFormService } from './json-schema-form.service';
import { LayoutItem } from './layout-item.data';
import { LayoutService } from './layout.service';
import { SchemaService } from './schema.service';

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
    @Input() schema: JSONSchema7;
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
        this.layoutService.layout = cloneDeep(this.layout);
    }

    private initializeSchema(): void {
        if (isPlainObject(this.schema)) {
            this.schemaService.schema = cloneDeep(this.schema);
        }
    }
}
