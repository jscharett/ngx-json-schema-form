import { Component } from '@angular/core';

import { JsonSchemaFormService } from '../../../json-schema-form.service';

import { Widget } from '../../widget';

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
