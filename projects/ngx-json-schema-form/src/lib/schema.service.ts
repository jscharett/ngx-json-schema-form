import { Injectable } from '@angular/core';

import Ajv from 'ajv';

@Injectable()
export class SchemaService {
    private readonly ajv: Ajv.Ajv = new Ajv({ allErrors: true, jsonPointers: true, unknownFormats: 'ignore' });
    // TODO: Setter function to automatically upgrade schema version?
    private _schema: any = {};
    set schema(value: Object) {
        this._schema = value;
        this.compileSchema();
    }
    get schema(): Object {
        return this._schema;
    }

    private validator: Ajv.ValidateFunction;

    validate(data: any): boolean {
        return <boolean>this.validator(data);
    }

    private compileSchema() {
        this.ajv.removeSchema(this.schema);
        this.validator = this.ajv.compile(this.schema);
    }
}
