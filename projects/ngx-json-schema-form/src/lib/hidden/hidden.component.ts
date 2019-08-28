import { Component } from '@angular/core';

import { Widget } from '../core/decorators/widget.decorator';
import { ElementDataStorageService } from '../core/services/element-data-storage.service';
import { AbstractWidget } from '../core/widget/widget';
import { JsonSchemaFormService } from '../json-schema-form.service';

/**
 * Displays an input[type='hidden']
 */
@Widget({
    types: ['hidden']
})
@Component({
    selector: 'jsf-hidden',
    styleUrls: ['./hidden.component.scss'],
    templateUrl: './hidden.component.html'
})
export class HiddenComponent extends AbstractWidget {
    constructor(jsf: JsonSchemaFormService, elementDataStorage: ElementDataStorageService) {
        super(jsf, elementDataStorage);
    }
}
