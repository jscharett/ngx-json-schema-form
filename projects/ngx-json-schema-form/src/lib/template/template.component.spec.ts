import { ComponentFixture, TestBed } from '@angular/core/testing';

import { extendLayoutNode, extendModuleDef } from '../core/testing';

import { TemplateComponent } from './template.component';

describe('TemplateComponent', () => {
    let component: TemplateComponent;
    let fixture: ComponentFixture<TemplateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule(extendModuleDef({
            declarations: [ TemplateComponent ]
        }))
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TemplateComponent);
        component = fixture.componentInstance;
        component.layoutNode = extendLayoutNode({type: 'template', items: []});
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
