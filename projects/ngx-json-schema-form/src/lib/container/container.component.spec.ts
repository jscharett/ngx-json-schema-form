import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNode } from '../core/models/layout-node';

import { JsonSchemaFormService } from '../form/services/json-schema-form.service';

import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {
    let component: ContainerComponent;
    let fixture: ComponentFixture<ContainerComponent>;

    beforeEach(async () => {
        const mockFormService: JsonSchemaFormService = jasmine.createSpyObj('JsonSchemaFormService', {
            initializeControl: true
        });
        (<jasmine.Spy>mockFormService.initializeControl).and.callFake((comp) => {
            comp.options = comp.layoutNode.options;
        });

        await TestBed.configureTestingModule({
            declarations: [ ContainerComponent ],
            providers: [{
                provide: JsonSchemaFormService,
                useValue: mockFormService
            }],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ContainerComponent);
        component = fixture.componentInstance;
        component.layoutNode = {id: '0', items: [], options: {}, type: 'div'} as any as LayoutNode;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should return index for tracking', () => {
        fixture.detectChanges();
        expect(component.trackByFn(1)).toEqual(1);
    });

    describe('selectedLayout', () => {
        it('should be undefined for div', () => {
            (<any>component.layoutNode).type = 'div';
            fixture.detectChanges();
            expect(component.selectedLayout).toBeUndefined();
        });

        it('should be undefined for details', () => {
            (<any>component.layoutNode).type = 'details';
            fixture.detectChanges();
            expect(component.selectedLayout).toBeUndefined();
        });

        it('should be undefined for fieldset', () => {
            (<any>component.layoutNode).type = 'fieldset';
            fixture.detectChanges();
            expect(component.selectedLayout).toBeUndefined();
        });

        it('should be undefined for tab', () => {
            (<any>component.layoutNode).type = 'tab';
            fixture.detectChanges();
            expect(component.selectedLayout).toBeUndefined();
        });

        describe('tabs', () => {
            beforeEach(() => {
                (<any>component.layoutNode).type = 'tabs';
                component.layoutNode.items.push({id: '1', items: [], options: {}, type: 'tab'} as any as LayoutNode);
                component.layoutNode.items.push({id: '2', items: [], options: {}, type: 'tab'} as any as LayoutNode);
                component.layoutNode.items.push({id: '3', items: [], options: {}, type: 'tab'} as any as LayoutNode);
            });

            it('should default to the first layout for tabs', () => {
                fixture.detectChanges();
                expect(component.selectedLayout).toBe(component.layoutNode.items[0]);
            });

            it('should default to the first layout if optional selectedIndex is < 0', () => {
                component.layoutNode.options.selectedIndex = -1;
                fixture.detectChanges();
                expect(component.selectedLayout).toBe(component.layoutNode.items[0]);
            });

            it('should default to the last layout if optional selectedIndex is > length', () => {
                component.layoutNode.options.selectedIndex = component.layoutNode.items.length + 1;
                fixture.detectChanges();
                expect(component.selectedLayout).toBe(component.layoutNode.items[component.layoutNode.items.length - 1]);
            });

            it('should use the optional selectedIndex if its >= 0 && < length', () => {
                component.layoutNode.options.selectedIndex = 1;
                fixture.detectChanges();
                expect(component.selectedLayout).toBe(component.layoutNode.items[1]);
            });

            it('should set selectedLayout when tab clicked', () => {
                fixture.detectChanges();
                expect(component.selectedLayout).toBe(component.layoutNode.items[0]);
                component.onTabClick(component.layoutNode.items[1]);
                expect(component.selectedLayout).toBe(component.layoutNode.items[1]);
            });
        });
    });
});
