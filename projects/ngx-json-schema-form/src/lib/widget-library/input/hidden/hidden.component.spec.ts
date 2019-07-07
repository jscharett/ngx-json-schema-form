import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonSchemaFormService } from '../../..';

import { HiddenComponent } from './hidden.component';

describe('HiddenComponent', () => {
    let component: HiddenComponent;
    let fixture: ComponentFixture<HiddenComponent>;

    beforeEach(async () => {
        const mockFormService: JsonSchemaFormService = jasmine.createSpyObj('JsonSchemaFormService', {
            initializeControl: true,
            updateValue: undefined
        });
        (<jasmine.Spy>mockFormService.initializeControl).and.callFake((comp) => {
            comp.options = comp.layoutNode.options;
        });

        return TestBed.configureTestingModule({
            declarations: [ HiddenComponent ],
            providers: [{
                provide: JsonSchemaFormService,
                useValue: mockFormService
            }],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HiddenComponent);
        component = fixture.componentInstance;
        component.layoutNode = {id: '0', options: {}, type: 'hidden'};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
