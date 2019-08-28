import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNode } from '../core/models/layout-node';
import { JsonSchemaFormService } from '../json-schema-form.service';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async () => {
        const mockFormService: JsonSchemaFormService = jasmine.createSpyObj('JsonSchemaFormService', {
            initializeControl: true
        });
        (<jasmine.Spy>mockFormService.initializeControl).and.callFake((comp) => {
            comp.options = comp.layoutNode.options;
        });

        return TestBed.configureTestingModule({
            declarations: [ ButtonComponent ],
            providers: [{
                provide: JsonSchemaFormService,
                useValue: mockFormService
            }],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        component.layoutNode = {id: '0', options: {}, type: 'button'} as any as LayoutNode;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
