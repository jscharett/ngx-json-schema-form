import { ComponentFixture, TestBed } from '@angular/core/testing';

import { extendLayoutNode, extendModuleDef } from '../core/testing';

import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {
    let component: ContainerComponent;
    let fixture: ComponentFixture<ContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule(extendModuleDef({
            declarations: [ ContainerComponent ]
        }))
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ContainerComponent);
        component = fixture.componentInstance;
        component.layoutNode = extendLayoutNode({items: [], type: 'div'});
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
            component.layoutNode.items.push(extendLayoutNode({id: '1', items: [], type: 'tab'}));
            component.layoutNode.items.push(extendLayoutNode({id: '2', items: [], type: 'tab'}));
            component.layoutNode.items.push(extendLayoutNode({id: '3', items: [], type: 'tab'}));
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
