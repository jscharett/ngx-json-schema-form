import { Injectable } from '@angular/core';

/**
 * Service to map data to an DOM element similar to jQuery $.data
 * While HTML provides its data-* attributes to store data on the node
 * itself, this only works for primitive data.  Objects and arrays would need
 * to be converted to json for then to use data-* and thus would not
 * be able to contain non-json types like Function.  This service allows
 * for referencing data to a HTML element via a WeakMap so that when the element
 * is removed from the DOM, the garbage collector can automatically remove the
 * reference in the Service.
 */
@Injectable({
    providedIn: 'root'
})
export class ElementDataStorageService {
    /** Map to reference data to an element */
    private readonly storage: WeakMap<HTMLElement, Map<string, any>> = new WeakMap<HTMLElement, Map<string, any>>();

    /** Add key/value pairing to map referenced by element */
    set(element: HTMLElement, key: string, value: any): ElementDataStorageService {
        const mappedData = this.storage.get(element) || this.storage.set(element, new Map()).get(element);
        mappedData.set(key, value);

        return this;
    }

    /** Return a key's value for an element */
    get(element: HTMLElement, key: string): any {
        return this.storage.has(element)
            ? this.storage.get(element).get(key)
            : undefined;
    }

    /** Determine if an element has a key/value pairing referenced */
    has(element: HTMLElement, key: string): boolean {
        return this.storage.has(element) && this.storage.get(element).has(key);
    }

    /** Remove a key/value pairing from map referenced by element */
    delete(element: HTMLElement, key: string): boolean {
        let deleted = this.storage.has(element);
        if (deleted) {
            const mappedData = this.storage.get(element);
            deleted = mappedData.delete(key);
            if (mappedData.size === 0) {
                this.storage.delete(element);
            }
        }

        return deleted;
    }
}
