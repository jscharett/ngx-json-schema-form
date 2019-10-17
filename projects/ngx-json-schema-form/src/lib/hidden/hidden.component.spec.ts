import { ComponentFixture, TestBed } from '@angular/core/testing';

import { extendLayoutNode, extendModuleDef } from '../core/testing';

import { HiddenComponent } from './hidden.component';

describe('HiddenComponent', () => {
    let component: HiddenComponent;
    let fixture: ComponentFixture<HiddenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule(extendModuleDef({
            declarations: [ HiddenComponent ]
        }))
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HiddenComponent);
        component = fixture.componentInstance;
        component.layoutNode = extendLayoutNode({type: 'hidden'});
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
