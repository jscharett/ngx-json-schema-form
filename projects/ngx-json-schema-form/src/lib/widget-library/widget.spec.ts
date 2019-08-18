import { Component, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { JsonSchemaFormService } from '..';
import { LayoutNode } from '../core/models/layout-node';
import { ElementDataStorageService } from '../core/services/element-data-storage.service';

import { Widget } from '.';

@Component({
    selector: 'jsf-test-component',
    template: '<div #control>Hello World</div>'
})
class TestComponent extends Widget {
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
        const change = new SimpleChange(component.layoutNode, newLayoutNode, true);
        component.layoutNode = newLayoutNode;
        component[`ngOnChanges`]({layoutNode: change});
        expect(edsService.set).toHaveBeenCalledWith(jasmine.any(HTMLElement), 'layout', newLayoutNode.layoutDefinition);
    });

    it('should not propagate other Inputs to edsService', () => {
        const edsService: ElementDataStorageService = TestBed.get(ElementDataStorageService);
        (<jasmine.Spy>edsService.set).calls.reset();
        const newLayoutIndex = [1];
        const newDataIndex = [1];
        const change1 = new SimpleChange(component.layoutIndex, newLayoutIndex, true);
        const change2 = new SimpleChange(component.dataIndex, newDataIndex, true);
        component.layoutIndex = newLayoutIndex;
        component.dataIndex = newDataIndex;
        component[`ngOnChanges`]({
            dataIndex: change2,
            layoutIndex: change1
        });
        expect(edsService.set).not.toHaveBeenCalled();
    });

});
