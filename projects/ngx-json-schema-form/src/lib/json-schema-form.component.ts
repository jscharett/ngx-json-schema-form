import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';

import { cloneDeep, isPlainObject } from 'lodash';

import { JsonSchemaFormService } from './json-schema-form.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ JsonSchemaFormService ],
    selector: 'jsf-json-schema-form',
    styles: [],
    template: `
        <form></form>
    `
})
export class JsonSchemaFormComponent implements OnChanges, OnInit {
    @Input() schema: any;

    private formInitialized = false;

    constructor(private readonly jsf: JsonSchemaFormService) {}

    ngOnInit() {
        this.updateForm();
    }

    ngOnChanges() {
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
            this.jsf.schema = cloneDeep(this.schema);
        }
    }

}
