import { Injectable } from '@angular/core';

import traverse from 'json-schema-traverse';

import Ajv from 'ajv';

import { JSONSchema7, JSONSchema7Definition } from 'json-schema';

/** Provides services for parsing JSON Schema and validating data */
@Injectable()
export class SchemaService {
    // TODO: Setter function to automatically upgrade schema version?
    private _schema: JSONSchema7 = {};
    /**
     * @param value - JSON Schema to be used for validation
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
