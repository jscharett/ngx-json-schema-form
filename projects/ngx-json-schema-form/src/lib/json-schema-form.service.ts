import { Injectable } from '@angular/core';
import { Widget } from './widget-library';

/** TODO */
@Injectable()
export class JsonSchemaFormService {
    private x = false;

    /** Sets a widgets properties upon Widget creation */
    initializeControl(control: Widget, bind = true): void {
        // Do we even need to do this?  seems silly
        control.controlName = control.layoutNode.name;
    }

    /** TODO */
    updateValue(ctx: any, value: any): void {
        // TODO
        this.x = !this.x;
    }
}
