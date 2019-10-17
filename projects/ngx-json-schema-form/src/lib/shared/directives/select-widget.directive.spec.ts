import { CommonModule } from '@angular/common';
import { Component, ComponentRef, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { extendLayoutNode, extendModuleDef } from '../../core/testing';

import { LayoutNode } from '../../core/models/layout-node';
import { WidgetLibraryService } from '../../core/services/widget-library.service';

import { JsonSchemaFormService } from '../../form/services/json-schema-form.service';

import { SelectWidgetsDirective } from './select-widgets.directive';

@Component({
    selector: 'jsf-widget-component',
    template: '<div><ng-content></ng-content></div>'
})
class TestWidgetComponent {}

@NgModule({
    declarations: [ TestWidgetComponent ],
    entryComponents: [ TestWidgetComponent ],
    imports: [ CommonModule ]
})
class TestModule {} // tslint:disable-line

@Component({
    selector: 'jsf-component',
    template: '<ng-container [jsfLayout]="layoutNode.items" #widgetContainer></ng-container>'
})
class TestComponent {
    layoutNode: LayoutNode;
    otherInput: any;
    @ViewChild('widgetContainer', { read: ViewContainerRef }) widgetContainer: ViewContainerRef;
}// tslint:disable-line

describe('SelectWidgetsDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let newComponent: ComponentRef<any>;
    let documentFragment: DocumentFragment;

    beforeEach(async () => {
        documentFragment = document.createDocumentFragment();

        const mockFormService: JsonSchemaFormService = jasmine.createSpyObj('JsonSchemaFormService', {
            compileTemplate: documentFragment,
            initializeControl: true
        });
        const mockWidgetService: WidgetLibraryService = jasmine.createSpyObj('WidgetLibraryService', {
            getWidget: TestWidgetComponent
        });

        return TestBed.configureTestingModule(extendModuleDef({
            declarations: [ TestComponent, SelectWidgetsDirective ],
            imports: [ CommonModule, TestModule ],
            providers: [{
                provide: JsonSchemaFormService,
                useValue: mockFormService
            }, {
                provide: WidgetLibraryService,
                useValue: mockWidgetService
            }]
        }))
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        const original = (<any>component).widgetContainer.createComponent;
        spyOn((<any>component).widgetContainer, 'createComponent').and.callFake((...args) => {
            newComponent = original.apply((<any>component).widgetContainer, args);

            return newComponent;
        });
        component.layoutNode = extendLayoutNode({items: [
            extendLayoutNode({id: '1', type: 'hidden'})
        ], type: 'div'});
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should instantiate widget', () => {
        expect(newComponent.componentType).toEqual(TestWidgetComponent);
    });

    it('should set properties', () => {
        expect(newComponent.instance.layoutNode).toEqual(component.layoutNode.items[0]);
    });

    it('should update component when input changes', () => {
        const currentComponent = newComponent.instance;
        component.layoutNode = extendLayoutNode({id: '1', items: [
            extendLayoutNode({type: 'hidden'})
        ], type: 'div'});
        fixture.detectChanges();
        expect(newComponent.instance).not.toBe(currentComponent);
        expect(newComponent.instance.layoutNode).toEqual(component.layoutNode.items[0]);
    });

    it('should set template', () => {
        const span = document.createElement('span');
        span.innerText = 'hi';
        documentFragment.appendChild(span);
        component.layoutNode = extendLayoutNode({id: '1', items: [
            extendLayoutNode({
                id: '2',
                options: {title: 'hi'},
                template: '<span>{{ options.title }}</span>',
                type: 'button'
            })
        ], type: 'div'});
        fixture.detectChanges();

        expect(newComponent.location.nativeElement.innerHTML).toBe('<div><span>hi</span></div>');
    });
});
