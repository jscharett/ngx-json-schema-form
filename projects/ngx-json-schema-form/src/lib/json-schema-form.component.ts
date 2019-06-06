import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { cloneDeep, isPlainObject } from 'lodash';

import { JsonSchemaFormService } from './json-schema-form.service';
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
    template: `
        <form></form>
    `
})
export class JsonSchemaFormComponent implements OnChanges, OnInit {
    @Input() schema: any;
    @Input() layout: Array<any>;

    private formInitialized = false;

    constructor(
        // private readonly jsf: JsonSchemaFormService,
        private readonly schemaService: SchemaService,
        private readonly layoutService: LayoutService
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

    private initializeLayout() {
        this.layoutService.layout = cloneDeep(this.layout);
    }

    private initializeSchema(): void {
        if (isPlainObject(this.schema)) {
            this.schemaService.schema = cloneDeep(this.schema);
        }
    }
}
