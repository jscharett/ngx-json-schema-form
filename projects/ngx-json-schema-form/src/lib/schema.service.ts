import { Injectable } from '@angular/core';

import Ajv from 'ajv';

import { JSONSchema7 } from 'json-schema';


@Injectable()
export class SchemaService {
    // TODO: Setter function to automatically upgrade schema version?
    private _schema: JSONSchema7 = {};
    set schema(value: JSONSchema7) {
        this._schema = value;
        this.compileSchema();
    }
    get schema(): JSONSchema7 {
        return this._schema;
    }

    private readonly ajv: Ajv.Ajv = new Ajv({ allErrors: true, jsonPointers: true, unknownFormats: 'ignore' });
    private validator: Ajv.ValidateFunction;

    validate(data: any): boolean {
        return <boolean>this.validator(data);
    }

    private compileSchema() {
        this.ajv.removeSchema(this.schema);
        this.validator = this.ajv.compile(this.schema);
    }
}
