import { Injectable } from '@angular/core';

import Ajv from 'ajv';

import { JSONSchema7 } from 'json-schema';

/** Provides services for parsing JSON Schema and valdiating data */
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
