import { CommonModule } from '@angular/common';
import { Component, ComponentRef, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNode } from '../core/models/layout-node';
import { WidgetLibraryService } from '../core/services/widget-library.service';

import { JsonSchemaFormService } from '../form/services/json-schema-form.service';

import { SelectWidgetComponent } from './select-widget.component';

describe('SelectWidgetComponent', () => {
    let component: SelectWidgetComponent;
    let fixture: ComponentFixture<SelectWidgetComponent>;
    let newComponent: ComponentRef<any>;
    let documentFragment: DocumentFragment;

    @Component({
        selector: 'jsf-component',
        template: '<div><ng-content></ng-content></div>'
    })
    class TestComponent {}

    @NgModule({
        declarations: [ TestComponent ],
        entryComponents: [ TestComponent ],
        imports: [ CommonModule ]
    })
    class TestModule {} // tslint:disable-line

    beforeEach(async () => {
        documentFragment = document.createDocumentFragment();

        const mockFormService: JsonSchemaFormService = jasmine.createSpyObj('JsonSchemaFormService', {
            compileTemplate: documentFragment,
            initializeControl: true
        });
        const mockWidgetService: WidgetLibraryService = jasmine.createSpyObj('WidgetLibraryService', {
            getWidget: TestComponent
        });

        return TestBed.configureTestingModule({
            declarations: [ SelectWidgetComponent ],
            imports: [ TestModule ],
            providers: [{
                provide: JsonSchemaFormService,
                useValue: mockFormService
            }, {
                provide: WidgetLibraryService,
                useValue: mockWidgetService
            }]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectWidgetComponent);
        component = fixture.componentInstance;
        const original = component.widgetContainer.createComponent;
        spyOn(component.widgetContainer, 'createComponent').and.callFake((...args) => {
            newComponent = original.apply(component.widgetContainer, args);

            return newComponent;
        });
    });

    describe('', () => {
        beforeEach(() => {
            component.layoutNode = {id: '0', options: {}, type: 'hidden'} as any as LayoutNode;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should instantiate widget', () => {
            expect(newComponent.componentType).toEqual(TestComponent);
        });

        it('should set properties', () => {
            expect(newComponent.instance.layoutNode).toEqual(component.layoutNode);
            expect(newComponent.instance.layoutIndex).toEqual(component.layoutIndex);
            expect(newComponent.instance.dataIndex).toEqual(component.dataIndex);
        });

        it('should update component when input changes', () => {
            component.dataIndex = [1 + 1];
            component[`ngOnChanges`]();
            expect(newComponent.instance.dataIndex).toEqual(component.dataIndex);
        });
    });


    it('should set content', () => {
        const span = document.createElement('span');
        span.innerText = 'hi';
        documentFragment.appendChild(span);
        component.layoutNode = {
            content: '<span>{{ options.title }}</span>',
            id: '0',
            options: {title: 'hi'},
            type: 'button'
        } as any as LayoutNode;
        fixture.detectChanges();

        expect(newComponent.location.nativeElement.innerHTML).toBe('<div><span>hi</span></div>');
    });
});
