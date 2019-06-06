import { inject, TestBed } from '@angular/core/testing';

import basicJSONLayout from '../assests/example-layouts/jsf-layout-basic.json';

import { LayoutService } from './layout.service';

describe('LayoutService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LayoutService
            ]
        });
    });

    it('should be created', () => {
        const service: LayoutService = TestBed.get(LayoutService);
        expect(service).toBeTruthy();
    });

    it('should augment layout with derived props', inject([LayoutService], (service: LayoutService) => {
        service.layout = basicJSONLayout;
        expect(service.layout).toEqual([{
            id: jasmine.any(String),
            key: basicJSONLayout[0].key,
            options: {},
            type: basicJSONLayout[0].type
        }]);
    }));

    it('should remove unknown props from layout', inject([LayoutService], (service: LayoutService) => {
        service.layout = [{cat: 1}];
        expect(service.layout).toEqual([{
            id: jasmine.any(String),
            options: {}
        }]);
    }));
});
