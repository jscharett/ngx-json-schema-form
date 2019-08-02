import { Component } from '@angular/core';

import { JsonSchemaFormService } from '../../../json-schema-form.service';

import { Widget } from '../../widget';

/** Displays a <button> control */
@Component({
    selector: 'jsf-button',
    styleUrls: ['./button.component.scss'],
    templateUrl: './button.component.html'
})
export class ButtonComponent extends Widget {

    constructor(jsf: JsonSchemaFormService) {
        super(jsf);
    }

    /**
     * Handle the mouse click event
     */
    onClick(event: MouseEvent): void {
        this.jsf.fireEvent(event, this.layoutNode);
    }


    // TODO- pulled from submit
    // this.jsf.formOptions.disableInvalidSubmit
}
