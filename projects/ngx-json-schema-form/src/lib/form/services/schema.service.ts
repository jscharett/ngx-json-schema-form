import { Injectable } from '@angular/core';

import { cloneDeep } from 'lodash';

import { JSONSchema4, JSONSchema6, JSONSchema7, JSONSchema7Definition } from 'json-schema';

import migrate from 'json-schema-migrate';
import traverse from 'json-schema-traverse';

import Ajv from 'ajv';

import { SchemaAnalyzer } from '../../core/interfaces/schema-analyzer.data';

/** Provides services for parsing JSON Schema and validating data */
@Injectable()
export class SchemaService implements SchemaAnalyzer {
    private _schema: JSONSchema7 = {};
    /**
     * @param value - JSON Schema to be used for validation
     * @todo implement schema migration?
     */
    set schema(value: JSONSchema7) {
        this._schema = value;
        this.compileSchema();
    }
    get schema(): JSONSchema7 {
        return this._schema;
    }

    /**
     * Gets a map of all the relevant json data pointers
     * and their related schema definitions.  This allows for
     * easy lookup of a schema reference from a json pointer.
     */
    get dataPointerMap(): Map<string, JSONSchema7Definition> {
        const pointers: Map<string, JSONSchema7Definition> = new Map<string, JSONSchema7Definition>();
        traverse(this.schema, {cb: (...args) => {
            const [schema, pointer, , , , parentSchema] = args;
            if (pointer && parentSchema && parentSchema.type !== 'array' && schema.type !== 'object') {
                pointers.set(pointer.replace(/\/properties/g, ''), schema);
            }
        }});

        return pointers;
    }

    private readonly ajv: Ajv.Ajv = new Ajv({ allErrors: true, jsonPointers: true, unknownFormats: 'ignore' });
    private validator: Ajv.ValidateFunction;

    /**
     * Migrate a schema from draft 4/6 to draft 7
     */
    migrate(schema: JSONSchema4 | JSONSchema6 | JSONSchema7): JSONSchema7 {
        const migratedSchema = cloneDeep(schema);
        if (!migratedSchema.$schema || !migratedSchema.$schema.includes('draft-07')) {
            if (migratedSchema.$schema && migratedSchema.$schema.includes('draft-04')) {
                migrate.draft6(migratedSchema);
            }
            // Per https://github.com/epoberezkin/json-schema-migrate/issues/1, draft 7 is
            // fully backwards compatible with 6, so changing $schema should suffice?
            migratedSchema.$schema = 'http://json-schema.org/draft-07/schema#';
        }

        return migratedSchema as JSONSchema7;
    }

    /**
     * Validates data based on set JSON Schema
     * @param data - data to be valdiated
     */
    validate(data: any): boolean {
        return <boolean>this.validator(data);
    }

    private compileSchema() {
        this.ajv.removeSchema(this.schema);
        this.validator = this.ajv.compile(this.schema);
    }
}
