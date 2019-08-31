import { TestBed } from '@angular/core/testing';

import { JSONSchema4, JSONSchema6, JSONSchema7, JSONSchema7Definition } from 'json-schema';

import { cloneDeep } from 'lodash';

import basicJSONSchema from '../../../assests/example-schemas/jsf-schema-basic.json';
import schemaVersion4 from '../../../assests/example-schemas/json-schema-draft04.json';
import schemaVersion6 from '../../../assests/example-schemas/json-schema-draft06.json';

import { SchemaService } from './schema.service';

describe('SchemaService', () => {
    let schema: JSONSchema7;
    let schemaV6: JSONSchema6;
    let schemaV4: JSONSchema4;

    beforeEach(() => {
        schema = cloneDeep(basicJSONSchema as JSONSchema7);
        schemaV6 = cloneDeep(schemaVersion6 as JSONSchema6);
        schemaV4 = cloneDeep(schemaVersion4 as JSONSchema4);
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

    describe('migrate', () => {
        it('should preserve v7 schemas', () => {
            const service: SchemaService = TestBed.get(SchemaService);
            expect(service.migrate(schema)).toEqual(schema);
        });

        it('should migrate v6 schemas', () => {
            const service: SchemaService = TestBed.get(SchemaService);
            const newSchema: any = service.migrate(schemaV6);
            expect(newSchema).not.toEqual(schemaV6);
            expect(newSchema.$schema).toBe('http://json-schema.org/draft-07/schema#');
        });

        it('should migrate v4 schemas', () => {
            const service: SchemaService = TestBed.get(SchemaService);
            const newSchema: any = service.migrate(schemaV4);
            expect(newSchema).not.toEqual(schemaV4);
            expect(newSchema.$schema).toBe('http://json-schema.org/draft-07/schema#');
        });
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
