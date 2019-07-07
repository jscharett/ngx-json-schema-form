import { TestBed } from '@angular/core/testing';

import { JSONSchema7, JSONSchema7Definition } from 'json-schema';

import basicJSONSchema from '../assests/example-schemas/jsf-schema-basic.json';

import { SchemaService } from './schema.service';

describe('SchemaService', () => {
    beforeEach(() => {
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
        service.schema = basicJSONSchema as JSONSchema7;
        expect(service.schema).toBe(basicJSONSchema as JSONSchema7);
    });

    it('should parse schema into a map of keys and json schem definitions', () => {
        const service: SchemaService = TestBed.get(SchemaService);
        service.schema = basicJSONSchema as JSONSchema7;
        expect(service.dataPointerMap).toEqual(new Map<string, JSONSchema7Definition>([
            ['/name', basicJSONSchema.properties.name as JSONSchema7Definition],
            ['/gender', basicJSONSchema.properties.gender as JSONSchema7Definition]
        ]));
    });
});
