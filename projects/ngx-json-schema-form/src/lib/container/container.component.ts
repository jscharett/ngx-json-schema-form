import { Component } from '@angular/core';

import { Widget } from '../core/decorators/widget.decorator';
import { ElementDataStorageService } from '../core/services/element-data-storage.service';
import { AbstractWidget } from '../core/widget/widget';

import { JsonSchemaFormService } from '../form/services/json-schema-form.service';

/** Displays a div, fieldset or details element and renders children inside it */
@Widget({
    types: ['div', 'fieldset', 'details']
})
@Component({
    selector: 'jsf-container',
    styleUrls: ['./container.component.scss'],
    templateUrl: './container.component.html'
})
export class ContainerComponent extends AbstractWidget {

    constructor(jsf: JsonSchemaFormService, elementDataStorage: ElementDataStorageService) {
        super(jsf, elementDataStorage);
    }

    trackByFn(index) {
        return index;
    }

}
