import { TestBed } from '@angular/core/testing';

import { ElementDataStorageService } from './core/services/element-data-storage.service';
import { AbstractWidget } from './core/widget/widget';

import { JsonSchemaFormService } from './json-schema-form.service';

describe('JsonSchemaFormService', () => {
    class TestWidget extends AbstractWidget {}

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                JsonSchemaFormService
            ]
        });
    });

    it('should be created', () => {
        const service: JsonSchemaFormService = TestBed.get(JsonSchemaFormService);
        expect(service).toBeTruthy();
    });

    it('should set controlName on widget', () => {
        const service: JsonSchemaFormService = TestBed.get(JsonSchemaFormService);
        const eds: ElementDataStorageService = jasmine.createSpyObj('ElementDataStorageService', {
            set: undefined
        });
        const widget: TestWidget = new TestWidget(service, eds);
        widget.layoutNode = <any>{name: 'widget', id: '1', dataPointer: '/key', options: {}};
        service.initializeControl(widget);
        expect(widget.controlName).toBe('widget');
    });

    it('should convert template to DOM', () => {
        const service: JsonSchemaFormService = TestBed.get(JsonSchemaFormService);
        const fragment: DocumentFragment = service.compileTemplate('<span>{{ options.title }}</span>', {title: 'hi'});
        const div = document.createElement('div');
        div.appendChild(fragment.cloneNode(true));

        expect(div.innerHTML).toBe('<span>hi</span>');
    });
});
