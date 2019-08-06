import { Component } from '@angular/core';

import { ElementDataStorageService } from '../../../element-data-storage.service';
import { JsonSchemaFormService } from '../../../json-schema-form.service';

import { Widget } from '../../widget';

/**
 * Displays an input[type='hidden']
 */
@Component({
    selector: 'jsf-hidden',
    styleUrls: ['./hidden.component.scss'],
    templateUrl: './hidden.component.html'
})
export class HiddenComponent extends Widget {
    constructor(jsf: JsonSchemaFormService, elementDataStorage: ElementDataStorageService) {
        super(jsf, elementDataStorage);
    }
}
