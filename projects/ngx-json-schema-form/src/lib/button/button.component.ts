import { Component } from '@angular/core';

import { Widget } from '../core/decorators/widget.decorator';
import { ElementDataStorageService } from '../core/services/element-data-storage.service';
import { AbstractWidget } from '../core/widget/widget';

import { JsonSchemaFormService } from '../form/services/json-schema-form.service';

/**
 * Displays a <button> control
 * @todo implement this.jsf.formOptions.disableInvalidSubmit
 */
@Widget({
    types: ['button', 'image', 'reset', 'submit']
})
@Component({
    selector: 'jsf-button',
    styleUrls: ['./button.component.scss'],
    templateUrl: './button.component.html'
})
export class ButtonComponent extends AbstractWidget {
    constructor(jsf: JsonSchemaFormService, elementDataStorage: ElementDataStorageService) {
        super(jsf, elementDataStorage);
    }
}
