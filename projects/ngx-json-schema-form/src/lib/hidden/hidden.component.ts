import { Component } from '@angular/core';

import { ElementDataStorageService } from '../core/services/element-data-storage.service';
import { Widget } from '../core/widget/widget';
import { JsonSchemaFormService } from '../json-schema-form.service';

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
