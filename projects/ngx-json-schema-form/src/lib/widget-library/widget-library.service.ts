import { Injectable } from '@angular/core';

import { ButtonComponent } from './input/button/button.component';
import { HiddenComponent } from './input/hidden/hidden.component';
import { Widget } from './widget';

@Injectable({
    providedIn: 'root'
})
export class WidgetLibraryService {
    private readonly defaultWidget = 'hidden';

    private readonly widgets = {
        button: ButtonComponent,
        hidden: HiddenComponent
    };

    getWidget(type: string): typeof Widget {
        return this.hasWidget(type)
            ? this.widgets[type]
            : this.widgets[this.defaultWidget];
    }

    private hasWidget(type: string): boolean {
        return !!this.widgets[type];
    }
}
