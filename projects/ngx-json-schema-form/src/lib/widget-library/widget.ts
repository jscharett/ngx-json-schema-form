import { Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from '../json-schema-form.service';

/** Widget */
export abstract class Widget implements OnInit {
    /** Flag to disable the control */
    controlDisabled = false;
    /** Name for the control */
    controlName: string;
    /** Value of the control */
    controlValue: any;
    /** Associated FormControl for widget */
    formControl: AbstractControl;
    /** Options for the control */
    options: any;

    /** Layout Node describing the control */
    @Input() layoutNode: any;
    /** Index of the layout in the Layout array */
    @Input() layoutIndex: Array<number>;
    /** Index of the data in data array */
    @Input() dataIndex: Array<number>;

    /** constructor */
    constructor(protected jsf: JsonSchemaFormService) {}

    /**
     * Initialize the control and populate the options
     */
    ngOnInit() {
        this.jsf.initializeControl(this);
        this.options = this.layoutNode.options || {};
    }

    /**
     * Update the value of the control
     * @param event - Change event
     */
    updateValue(event: Event) {
        this.jsf.updateValue(this, (<HTMLInputElement>event.target).value);
    }
}
