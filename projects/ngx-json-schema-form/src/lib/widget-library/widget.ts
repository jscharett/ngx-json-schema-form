import { Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from '../json-schema-form.service';

export abstract class Widget implements OnInit {
    controlDisabled = false;
    controlName: string;
    controlValue: any;
    formControl: AbstractControl;
    options: any;

    @Input() layoutNode: any;
    @Input() layoutIndex: Array<number>;
    @Input() dataIndex: Array<number>;

    constructor(protected jsf: JsonSchemaFormService) {}

    ngOnInit() {
        this.jsf.initializeControl(this);
        this.options = this.layoutNode.options || {};
    }

    updateValue(event: Event) {
        this.jsf.updateValue(this, (<HTMLInputElement>event.target).value);
    }
}
