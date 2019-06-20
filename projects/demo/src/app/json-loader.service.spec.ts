import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { cold } from 'jasmine-marbles';

import { JsonLoaderService } from './json-loader.service';

describe('JsonLoaderService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                JsonLoaderService
            ]
        });
    });

    it('should be created', () => {
        const service: JsonLoaderService = TestBed.get(JsonLoaderService);
        expect(service).toBeTruthy();
    });

    it('should have observable examples', () => {
        const service: JsonLoaderService = TestBed.get(JsonLoaderService);
        expect(service.examples).toBeObservable(cold('-'));
    });

    it('should have observable example', () => {
        const service: JsonLoaderService = TestBed.get(JsonLoaderService);
        expect(service.getExample('ngx', 'basic')).toBeObservable(cold('-'));
    });
});
