import { Component } from '@angular/core';

import { JsonSchemaFormService } from '../../../json-schema-form.service';

import { Widget } from '../../widget';

/**
 * HiddenComponent
 * Displays an input[type='hidden']
 */
@Component({
    selector: 'jsf-hidden',
    styleUrls: ['./hidden.component.scss'],
    templateUrl: './hidden.component.html'
})
export class HiddenComponent extends Widget {
    constructor(jsf: JsonSchemaFormService) {
        super(jsf);
    }
}
