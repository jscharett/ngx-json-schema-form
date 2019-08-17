import { TestBed } from '@angular/core/testing';

import { ElementDataStorageService } from './element-data-storage.service';

describe('ElementDataStorageService', () => {
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ElementDataStorageService
            ]
        });

        element = document.createElement('div');
    });

    it('should be created', () => {
        const service: ElementDataStorageService = TestBed.get(ElementDataStorageService);
        expect(service).toBeTruthy();
    });

    it('should not have data', () => {
        const service: ElementDataStorageService = TestBed.get(ElementDataStorageService);

        expect(service.has(element, 'layout')).toBeFalsy();
        expect(service.get(element, 'layout')).toBeUndefined();

        service.set(element, 'schema', {});

        expect(service.has(element, 'layout')).toBeFalsy();
        expect(service.get(element, 'layout')).toBeUndefined();
    });

    it('should have data', () => {
        const service: ElementDataStorageService = TestBed.get(ElementDataStorageService);
        const layout = {};
        service.set(element, 'layout', layout);

        expect(service.has(element, 'layout')).toBeTruthy();
        expect(service.get(element, 'layout')).toBe(layout);
    });

    it('should not have data once removed', () => {
        const service: ElementDataStorageService = TestBed.get(ElementDataStorageService);
        const layout = {};
        service.set(element, 'layout', layout);

        expect(service.has(element, 'layout')).toBeTruthy();
        expect(service.get(element, 'layout')).toBe(layout);

        service.delete(element, 'layout');

        expect(service.has(element, 'layout')).toBeFalsy();
        expect(service.get(element, 'layout')).toBeUndefined();
    });
});
