import { Injectable } from '@angular/core';

@Injectable()
export class JsonSchemaFormService {
  private x = false;

  // TODO: Setter function to automatically upgrade schema version?
  private _schema: any = {};
  set schema(value: Object) {
      this._schema = value;
      this.compileAjvSchema();
  }
  get schema(): Object {
      return this._schema;
  }

  initializeControl(ctx: any, bind = true): boolean {
    // TODO

    return this.x;
  }

  updateValue(ctx: any, value: any): void {
    // TODO
    this.x = value;
  }

  private compileAjvSchema() {
    // TODO
    this.x = true;
  }
}
