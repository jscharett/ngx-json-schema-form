import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JSONSchema7 } from 'json-schema';

import { Subject } from 'rxjs';

import basicJSONSchema from '../assests/example-schemas/jsf-schema-basic.json';

import { JsonSchemaFormService, LayoutService, SchemaService } from '.';

import { JsonSchemaFormComponent } from './json-schema-form.component';

describe('JsonSchemaFormComponent', () => {
    let component: JsonSchemaFormComponent;
    let fixture: ComponentFixture<JsonSchemaFormComponent>;
    let schemaSpy: jasmine.Spy;
    let eventSource: Subject<any>;

    beforeEach(async () => {
        const jsonSchemaFormService: JsonSchemaFormService = jasmine.createSpyObj('JsonSchemaFormService', {
            initializeControl: undefined
        });
        eventSource = new Subject();
        Object.defineProperty(jsonSchemaFormService, 'eventFired$', {
            enumerable: true,
            value: eventSource.asObservable()
        });
        const layoutService: LayoutService = <any>{setLayout: jasmine.createSpy('setLayout')};
        const schemaService: SchemaService = <any>{};

        return TestBed.configureTestingModule({
            declarations: [ JsonSchemaFormComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).overrideComponent(JsonSchemaFormComponent, {
            set: {
                providers: [
                    { provide: JsonSchemaFormService, useValue: jsonSchemaFormService },
                    { provide: LayoutService, useValue: layoutService },
                    { provide: SchemaService, useValue: schemaService }
                ]
            }
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JsonSchemaFormComponent);
        const schemaService: SchemaService = fixture.debugElement.injector.get(SchemaService);
        schemaSpy = jasmine.createSpy('schemaSpy');
        Object.defineProperty(schemaService, 'schema', {
            set: schemaSpy
        });
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have no schema set', () => {
        expect(component.schema).toBeUndefined();
        expect(schemaSpy).not.toHaveBeenCalled();
    });

    it('should have schema set', () => {
        component.schema = basicJSONSchema as JSONSchema7;
        component[`ngOnChanges`]({schema: new SimpleChange(undefined, basicJSONSchema, true)});
        fixture.detectChanges();

        expect(component.schema).toBeDefined();
        expect(schemaSpy).toHaveBeenCalledWith(basicJSONSchema);
    });
});
