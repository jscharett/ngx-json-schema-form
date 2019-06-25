import { Component } from '@angular/core';

import { JsonSchemaFormService } from '../../../json-schema-form.service';

import { Widget } from '../../widget';

@Component({
    selector: 'jsf-button',
    styleUrls: ['./button.component.scss'],
    templateUrl: './button.component.html'
})
export class ButtonComponent extends Widget {

    constructor(jsf: JsonSchemaFormService) {
        super(jsf);
    }

    updateValue(event: MouseEvent) {
        if (typeof this.options.onClick === 'function') {
            this.options.onClick(event);
        } else {
            super.updateValue(event);
        }
    }

}
