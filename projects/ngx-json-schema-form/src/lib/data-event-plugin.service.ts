import { Injectable, NgZone } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

import { ElementDataStorageService } from './element-data-storage.service';

export interface Data {
    data: any;
}
/** Event wrapper for piggybacking data on an event */
export type DataEvent<T> = Data & T;

/**
 * Plugin used to return data, associated with an element, in the event.  Data must first be
 * "associated" with an element by means of the ElementDataStorageService.  If no data is
 * present, then the event handler will not be fired.
 */
@Injectable({
    providedIn: 'root'
})
export class DataEventPluginService {
    /** Event manager used to get the ngZone */
    manager: EventManager;

    constructor(private readonly elementDataStorage: ElementDataStorageService) {}

    /** Determine if the plugin should be applied to an event */
    supports(eventName: string): boolean {
        return  /[a-z]+\.data\.[a-zA-Z]+/.test(eventName);
    }

    /** Adds a supported event listener to a dom node */
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
        const zone: NgZone = this.manager.getZone();
        const [type, , dataName] = eventName.split('.');
        const eventHandler = (event: DataEvent<Event>): void => {
            if (this.elementDataStorage.has(event.target as HTMLElement, dataName)) {
                const data = this.elementDataStorage.get(event.target as HTMLElement, dataName);
                event.data = data;

                zone.runGuarded(() => {
                    handler(event);
                });
            }
        };

        zone.runOutsideAngular(() => {
            element.addEventListener(type, eventHandler, false);
        });

        return () => {
            element.removeEventListener(type, eventHandler, false);
        };
    }
}
