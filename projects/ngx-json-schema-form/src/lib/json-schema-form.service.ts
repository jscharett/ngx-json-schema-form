import { Injectable } from '@angular/core';

@Injectable()
export class JsonSchemaFormService {
    private x = false;

    initializeControl(ctx: any, bind = true): boolean {
        // TODO

        return this.x;
    }

    updateValue(ctx: any, value: any): void {
        // TODO
        this.x = value;
    }
}
