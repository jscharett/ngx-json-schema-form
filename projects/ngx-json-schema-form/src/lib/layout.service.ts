import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {
    private _layout: Array<any> = [];
    set layout(value: Array<any>) {
        this._layout = value;
    }
    get layout(): Array<any> {
        return this._layout;
    }
}
