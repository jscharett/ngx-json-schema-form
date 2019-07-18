import { Injectable } from '@angular/core';

import { ButtonComponent } from './input/button/button.component';
import { HiddenComponent } from './input/hidden/hidden.component';
import { Widget } from './widget';

/**
 * Provides services for mapping a widget component to a layoutNode type
 */
@Injectable({
    providedIn: 'root'
})
export class WidgetLibraryService {
    private readonly defaultWidget = 'hidden';

    private readonly widgets = {
        button: ButtonComponent,
        hidden: HiddenComponent,
        image: ButtonComponent,
        reset: ButtonComponent,
        submit: ButtonComponent
    };

    /**
     * Gets a widget class from the type
     * @param type - type of component
     */
    getWidget(type: string): typeof Widget {
        return this.hasWidget(type)
            ? this.widgets[type]
            : this.widgets[this.defaultWidget];
    }

    private hasWidget(type: string): boolean {
        return !!this.widgets[type];
    }
}
