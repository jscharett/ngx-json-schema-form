import { Injectable } from '@angular/core';

import { AbstractWidget } from '../widget/widget';

/** Map of the default registered widgets */
const widgets: Map<string, typeof AbstractWidget> = new Map<string, typeof AbstractWidget>();

/** Internal method for registering a widget with the widget library */
export const register = (component: typeof AbstractWidget, types: Array<string>): void => {
    types.forEach((type: string) => {
        if (widgets.has(type)) {
            console.error(`Widget type "${type}" already exists.  Ignoring.`, component);
        } else {
            widgets.set(type, component);
        }
    });
};

/**
 * Provides services for mapping a widget component to a layoutNode type
 */
@Injectable({
    providedIn: 'root'
})
export class WidgetLibraryService {
    private readonly defaultWidget = 'hidden';

    /**
     * Gets a widget class from the type
     * @param type - type of component
     */
    getWidget(type: string): typeof AbstractWidget {
        return widgets.has(type)
            ? widgets.get(type)
            : widgets.get(this.defaultWidget);
    }
}
