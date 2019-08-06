import { TestBed } from '@angular/core/testing';

import { DataEventPluginService } from './data-event-plugin.service';
import { ElementDataStorageService } from './element-data-storage.service';
import { LayoutItem } from './layout-item.data';

describe('DataEventPluginService', () => {
    beforeEach(() => {
        const edsService: ElementDataStorageService = jasmine.createSpyObj('edsService', {
            get: undefined,
            has: false
        });
        TestBed.configureTestingModule({
            providers: [
                DataEventPluginService,
                {provide: ElementDataStorageService, useValue: edsService}
            ]
        });
    });

    beforeEach(() => {
        const wrapper = (fn: Function) => {
            fn();
        };
        const service: DataEventPluginService = TestBed.get(DataEventPluginService);
        service.manager = jasmine.createSpyObj('manager', {
            getZone: {
                runGuarded: jasmine.createSpy('runGuarded').and.callFake(wrapper),
                runOutsideAngular: jasmine.createSpy('runOutsideAngular').and.callFake(wrapper)
            }
        });
    });

    it('should be created', () => {
        const service: DataEventPluginService = TestBed.get(DataEventPluginService);
        expect(service).toBeTruthy();
    });

    describe('supports', () => {
        it('should return true', () => {
            const service: DataEventPluginService = TestBed.get(DataEventPluginService);
            ['click', 'mousedown', 'keypress', 'reset', 'focus', 'change'].forEach((type: string) => {
                expect(service.supports(`${type}.data.layout`)).toBeTruthy();
            });
        });

        it('should return false', () => {
            const service: DataEventPluginService = TestBed.get(DataEventPluginService);
            expect(service.supports('click')).toBeFalsy();
            expect(service.supports('click.')).toBeFalsy();
            expect(service.supports('click.data')).toBeFalsy();
            expect(service.supports('click.data.')).toBeFalsy();
        });
    });

    describe('addEventListener', () => {
        const eventName = 'click.data.layout';
        let element: HTMLElement;
        let handler: Function;

        beforeEach(() => {
            element = document.createElement('div');
            handler = jasmine.createSpy('handler');
            document.body.appendChild(element);
        });

        afterEach(() => {
            document.body.removeChild(element);
        });

        it('should return a function for removing listener', () => {
            const service: DataEventPluginService = TestBed.get(DataEventPluginService);
            spyOn(element, 'addEventListener').and.callThrough();
            spyOn(element, 'removeEventListener').and.callThrough();
            const removeHandler = service.addEventListener(element, eventName, handler);
            expect(element.addEventListener).toHaveBeenCalledWith('click', jasmine.any(Function), false);
            removeHandler();
            expect(element.removeEventListener).toHaveBeenCalledWith('click', jasmine.any(Function), false);
        });

        it('should ignore listener if no data present', () => {
            const service: DataEventPluginService = TestBed.get(DataEventPluginService);
            const removeHandler = service.addEventListener(element, eventName, handler);
            element.click();
            removeHandler();
            expect(handler).not.toHaveBeenCalled();
        });

        it('should fire listener when data present', () => {
            const service: DataEventPluginService = TestBed.get(DataEventPluginService);
            const edsService: ElementDataStorageService = TestBed.get(ElementDataStorageService);
            const layout: LayoutItem = {title: 'hey'};
            const removeHandler = service.addEventListener(element, eventName, handler);
            (<jasmine.Spy>edsService.has).and.returnValue(true);
            (<jasmine.Spy>edsService.get).and.returnValue(layout);
            element.click();
            removeHandler();
            expect(handler).toHaveBeenCalledWith(jasmine.objectContaining({
                data: layout,
                target: element
            }));
        });
    });
});
