import { TestBed } from '@angular/core/testing';

import { JsonSchemaFormService } from './json-schema-form.service';
import { Widget } from './widget-library';

describe('JsonSchemaFormService', () => {
    class TestWidget extends Widget {}

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
        const widget: TestWidget = new TestWidget(service);
        widget.layoutNode = <any>{name: 'widget', id: '1', dataPointer: '/key', options: {}};
        service.initializeControl(widget);
        expect(widget.controlName).toBe('widget');
    });

    it('should create a runtime component', () => {
        const service: JsonSchemaFormService = TestBed.get(JsonSchemaFormService);
        const fragment: DocumentFragment = service.compileTemplate('<span>{{ options.title }}</span>', {title: 'hi'});
        const div = document.createElement('div');
        div.appendChild(fragment.cloneNode(true));

        expect(div.innerHTML).toBe('<span>hi</span>');
    });
});
