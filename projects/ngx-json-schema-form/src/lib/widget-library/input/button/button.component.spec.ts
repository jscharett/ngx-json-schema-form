import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { JsonSchemaFormService } from '../../..';
import { LayoutNode } from '../../../layout-node';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async () => {
        const mockFormService: JsonSchemaFormService = jasmine.createSpyObj('JsonSchemaFormService', {
            fireEvent: undefined,
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

    it('should relay click event to jsf service', inject([JsonSchemaFormService], (jsfService: JsonSchemaFormService) => {
        const event = {target: {value: 'Y'}};
        component.onClick(<any>event);
        expect(jsfService.fireEvent).toHaveBeenCalledWith(event, component.layoutNode);
    }));
});
