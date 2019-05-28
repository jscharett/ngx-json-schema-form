import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { cloneDeep, isPlainObject } from 'lodash';

import { JsonSchemaFormService } from './json-schema-form.service';
import { SchemaService } from './schema.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        JsonSchemaFormService,
        SchemaService
    ],
    selector: 'jsf-json-schema-form',
    styles: [],
    template: `
        <form></form>
    `
})
export class JsonSchemaFormComponent implements OnChanges, OnInit {
    @Input() schema: any;

    private formInitialized = false;

    constructor(
        // private readonly jsf: JsonSchemaFormService,
        private readonly schemaService: SchemaService
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

    private updateForm() {
        if (!this.formInitialized) {
            this.initializeForm();
        }
    }

    private initializeForm() {
        this.initializeSchema();
        this.formInitialized = true;
    }

    private initializeSchema() {
        if (isPlainObject(this.schema)) {
            this.schemaService.schema = cloneDeep(this.schema);
        }
    }

}
