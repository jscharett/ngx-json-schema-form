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

    describe('tabs', () => {
        const getActiveItems = () => {
            return component.layoutNode.items.filter((item) => {
                return item.options.active;
            });
        };

        beforeEach(() => {
            (<any>component.layoutNode).type = 'tabs';
            component.layoutNode.items.push({id: '1', items: [], options: {}, type: 'tab'} as any as LayoutNode);
            component.layoutNode.items.push({id: '2', items: [], options: {}, type: 'tab'} as any as LayoutNode);
            component.layoutNode.items.push({id: '3', items: [], options: {}, type: 'tab'} as any as LayoutNode);
        });

        it('should default to the first layout for tabs', () => {
            fixture.detectChanges();
            expect(getActiveItems()).toEqual([component.layoutNode.items[0]]);
        });

        it('should default to the first active tab', () => {
            component.layoutNode.items.forEach((item) => {
                item.options.active = true;
            });
            fixture.detectChanges();
            expect(getActiveItems()).toEqual([component.layoutNode.items[0]]);
        });

        it('should use the optional active if its set', () => {
            component.layoutNode.items[1].options.active = true;
            fixture.detectChanges();
            expect(getActiveItems()).toEqual([component.layoutNode.items[1]]);
        });

        it('should set active when tab clicked', () => {
            fixture.detectChanges();
            expect(getActiveItems()).toEqual([component.layoutNode.items[0]]);
            component.onTabClick(component.layoutNode.items[1]);
            expect(getActiveItems()).toEqual([component.layoutNode.items[1]]);
        });
    });

    describe('tab', () => {
        beforeEach(() => {
            (<any>component.layoutNode).type = 'tab';
        });

        it('should be hidden when not active', () => {
            fixture.detectChanges();
            expect(component.isHidden).toBeTruthy();
        });

        it('should NOT be hidden when active', () => {
            component.layoutNode.options.active = true;
            fixture.detectChanges();
            expect(component.isHidden).toBeFalsy();
        });

        it('should listen for changes in active', () => {
            fixture.detectChanges();
            expect(component.isHidden).toBeTruthy();
            component.layoutNode.options.active = true;
            fixture.detectChanges();
            expect(component.isHidden).toBeFalsy();
            component.layoutNode.options.active = false;
            fixture.detectChanges();
            expect(component.isHidden).toBeTruthy();
        });
    });
});
