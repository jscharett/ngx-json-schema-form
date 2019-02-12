import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    let mockFormService: JsonSchemaFormService;

    beforeEach(async () => {
        mockFormService = jasmine.createSpyObj('JsonSchemaFormService', {
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
        component.layoutNode = {};
        fixture.detectChanges();
    });

    fit('should create', () => {
        expect(component).toBeTruthy();
    });

});
