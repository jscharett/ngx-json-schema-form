import { Component } from '@angular/core';

import { ElementDataStorageService } from '../../../element-data-storage.service';
import { JsonSchemaFormService } from '../../../json-schema-form.service';

import { Widget } from '../../widget';

/**
 * Displays a <button> control
 * @todo implement this.jsf.formOptions.disableInvalidSubmit
 */
@Component({
    selector: 'jsf-button',
    styleUrls: ['./button.component.scss'],
    templateUrl: './button.component.html'
})
export class ButtonComponent extends Widget {
    constructor(jsf: JsonSchemaFormService, elementDataStorage: ElementDataStorageService) {
        super(jsf, elementDataStorage);
    }
}
