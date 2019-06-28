import { Injectable } from '@angular/core';
import { Widget } from './widget-library';

@Injectable()
export class JsonSchemaFormService {
    private x = false;

    initializeControl(control: Widget, bind = true): void {
        control.controlName = control.layoutNode.name;
    }

    updateValue(ctx: any, value: any): void {
        // TODO
        this.x = !this.x;
    }
}
