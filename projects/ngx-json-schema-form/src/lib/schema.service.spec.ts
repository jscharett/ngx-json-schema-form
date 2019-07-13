import { TestBed } from '@angular/core/testing';

import { JSONSchema7, JSONSchema7Definition } from 'json-schema';

import { cloneDeep } from 'lodash';

import basicJSONSchema from '../assests/example-schemas/jsf-schema-basic.json';

import { SchemaService } from './schema.service';

describe('SchemaService', () => {
    let schema: JSONSchema7;

    beforeEach(() => {
        schema = cloneDeep(basicJSONSchema as JSONSchema7);
        TestBed.configureTestingModule({
            providers: [
                SchemaService
            ]
        });
    });

    it('should be created', () => {
        const service: SchemaService = TestBed.get(SchemaService);
        expect(service).toBeTruthy();
    });

    it('should set and get schema', () => {
        const service: SchemaService = TestBed.get(SchemaService);
        expect(service.schema).toEqual({});
        service.schema = schema;
        expect(service.schema).toBe(schema);
    });

    describe('dataPointerMap', () => {
        it('should parse schema into a map of keys and json schem definitions', () => {
            const service: SchemaService = TestBed.get(SchemaService);
            service.schema = schema;
            expect(service.dataPointerMap).toEqual(new Map<string, JSONSchema7Definition>([
                ['/name', schema.properties.name],
                ['/gender', schema.properties.gender]
            ]));
        });

        it('should ignore json pointers with type "object"', () => {
            const service: SchemaService = TestBed.get(SchemaService);
            schema.properties.a = {type: 'object', properties: {b: {type: 'string'}}};
            service.schema = schema;
            expect(service.dataPointerMap).toEqual(new Map<string, JSONSchema7Definition>([
                ['/name', schema.properties.name],
                ['/gender', schema.properties.gender],
                ['/a/b', schema.properties.a.properties.b]
            ]));
        });

        it('should ignore json pointers with parent type "array"', () => {
            const service: SchemaService = TestBed.get(SchemaService);
            schema.properties.a = {type: 'array', items: {type: 'string'}};
            schema.properties.b = {type: 'array', items: [{type: 'string'}, {type: 'number'}]};
            service.schema = schema;
            expect(service.dataPointerMap).toEqual(new Map<string, JSONSchema7Definition>([
                ['/name', schema.properties.name],
                ['/gender', schema.properties.gender],
                ['/a', schema.properties.a],
                ['/b', schema.properties.b]
            ]));
        });

    });
});
