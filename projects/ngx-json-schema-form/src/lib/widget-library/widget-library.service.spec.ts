import { TestBed } from '@angular/core/testing';

import { WidgetLibraryService } from './widget-library.service';

import { ButtonComponent } from './input/button/button.component';
import { HiddenComponent } from './input/hidden/hidden.component';

describe('WidgetLibraryService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        const service: WidgetLibraryService = TestBed.get(WidgetLibraryService);
        expect(service).toBeTruthy();
    });

    it('should return a widget class for known widget type', () => {
        const service: WidgetLibraryService = TestBed.get(WidgetLibraryService);
        expect(service.getWidget('button')).toBe(ButtonComponent);
    });

    it('should return a widget class', () => {
        const service: WidgetLibraryService = TestBed.get(WidgetLibraryService);
        expect(service.getWidget('dksc;sdlcf')).toBe(HiddenComponent);
    });
});
