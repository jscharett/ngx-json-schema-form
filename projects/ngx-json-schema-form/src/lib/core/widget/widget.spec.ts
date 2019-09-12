import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { JsonSchemaFormService } from '../../form/services/json-schema-form.service';

import { LayoutNode } from '../models/layout-node';
import { ElementDataStorageService } from '../services/element-data-storage.service';

import { AbstractWidget } from './widget';

@Component({
    selector: 'jsf-test-component',
    template: '<div #control>Hello World</div>'
})
class TestComponent extends AbstractWidget {
    constructor(jsf: JsonSchemaFormService, eds: ElementDataStorageService) {
        super(jsf, eds);
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
        const edsService: ElementDataStorageService = jasmine.createSpyObj('edsService', {
            set: undefined
        });

        return TestBed.configureTestingModule({
            declarations: [ TestComponent ],
            providers: [{
                provide: JsonSchemaFormService,
                useValue: mockFormService
            }, {
                provide: ElementDataStorageService,
                useValue: edsService
            }],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        component.layoutNode = {
            id: '0',
            layoutDefinition: {key: 'a'},
            options: {},
            type: ''
        } as any as LayoutNode;
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

    it('should call eds service to set inital data', () => {
        const edsService: ElementDataStorageService = TestBed.get(ElementDataStorageService);
        expect(edsService.set).toHaveBeenCalledWith(jasmine.any(HTMLElement), 'layout', component.layoutNode.layoutDefinition);
    });

    it('should propagate layoutNode changes to edsService', () => {
        const edsService: ElementDataStorageService = TestBed.get(ElementDataStorageService);
        (<jasmine.Spy>edsService.set).calls.reset();
        const newLayoutNode = {
            id: '2',
            layoutDefinition: {key: 'b'},
            options: {},
            type: ''
        } as any as LayoutNode;
        component.layoutNode = newLayoutNode;
        expect(edsService.set).toHaveBeenCalledWith(jasmine.any(HTMLElement), 'layout', newLayoutNode.layoutDefinition);
    });

    it('should not propagate other Inputs to edsService', () => {
        const edsService: ElementDataStorageService = TestBed.get(ElementDataStorageService);
        (<jasmine.Spy>edsService.set).calls.reset();
        const newLayoutIndex = [1];
        const newDataIndex = [1];
        component.layoutIndex = newLayoutIndex;
        component.dataIndex = newDataIndex;
        expect(edsService.set).not.toHaveBeenCalled();
    });

});
