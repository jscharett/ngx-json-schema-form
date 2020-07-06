import { Component } from '@angular/core';

import { Widget } from '../core/decorators/widget.decorator';
import { ElementDataStorageService } from '../core/services/element-data-storage.service';
import { AbstractWidget } from '../core/widget/widget';

import { JsonSchemaFormService } from '../form/services/json-schema-form.service';

@Widget({
    types: ['textarea']
})
@Component({
    selector: 'jsf-textarea',
    styleUrls: ['./textarea.component.scss'],
    templateUrl: './textarea.component.html'
})
export class TextareaComponent extends AbstractWidget {

    constructor(jsf: JsonSchemaFormService, elementDataStorage: ElementDataStorageService) {
        super(jsf, elementDataStorage);
    }

}
