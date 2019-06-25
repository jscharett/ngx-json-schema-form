import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { JsonSchemaFormService } from '../../..';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async () => {
        const mockFormService: JsonSchemaFormService = jasmine.createSpyObj('JsonSchemaFormService', {
            initializeControl: true,
            updateValue: undefined
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
        component.layoutNode = {};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should use the default update method when no click handler', inject(
        [JsonSchemaFormService], (jsfService: JsonSchemaFormService) => {
        const value = 'X';
        component.updateValue(<any>{target: {value}});
        expect(jsfService.updateValue).toHaveBeenCalledWith(component, value);
    }));

    it('should use click handler from options', inject(
        [JsonSchemaFormService], (jsfService: JsonSchemaFormService) => {
        const value = 'Y';
        component.options.onClick = jasmine.createSpy('onClick');
        component.updateValue(<any>{target: {value}});
        expect(jsfService.updateValue).not.toHaveBeenCalled();
        expect(component.options.onClick).toHaveBeenCalledWith({target: {value}});
    }));
});
