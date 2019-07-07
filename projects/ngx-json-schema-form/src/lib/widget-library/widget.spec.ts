import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { Widget } from '.';

import { JsonSchemaFormService } from '..';

@Component({
    selector: 'jsf-test-component',
    template: '<div>Hello World</div>'
})
class TestComponent extends Widget {
    constructor(jsf: JsonSchemaFormService) {
        super(jsf);
    }
}

describe('widgets', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async () => {
        const mockFormService: JsonSchemaFormService = jasmine.createSpyObj('JsonSchemaFormService', {
            initializeControl: true,
            updateValue: undefined
        });
        (<jasmine.Spy>mockFormService.initializeControl).and.callFake((comp) => {
            comp.options = comp.layoutNode.options;
        });

        return TestBed.configureTestingModule({
            declarations: [ TestComponent ],
            providers: [{
                provide: JsonSchemaFormService,
                useValue: mockFormService
            }],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        component.layoutNode = {id: '0', options: {}, type: ''};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initilize the control', inject([JsonSchemaFormService], (jsfService: JsonSchemaFormService) => {
        expect(jsfService.initializeControl).toHaveBeenCalledWith(component);
    }));

    it('should call service to update data', inject([JsonSchemaFormService], (jsfService: JsonSchemaFormService) => {
        const value = 5;
        const evt: Event = new Event('change');

        fixture.nativeElement.dispatchEvent(evt);
        (<any>evt.target).value = value;
        component.updateValue(evt);

        expect(jsfService.updateValue).toHaveBeenCalledWith(component, value);
    }));

});
