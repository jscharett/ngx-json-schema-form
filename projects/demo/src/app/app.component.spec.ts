import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { cold, getTestScheduler } from 'jasmine-marbles';

import examples from '../assets/examples/examples.json';
import example from '../assets/examples/ngx/simple-array.json';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { JsonLoaderService } from './json-loader.service';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;

    beforeEach(async () => {
        const jsl: JsonLoaderService = jasmine.createSpyObj('JsonLoaderService', {
            getExample: cold('a|', {a: JSON.stringify(example)})
        });
        Object.defineProperty(jsl, 'examples', {
            enumerable: true,
            get: () => cold('a|', {a: examples})
        });

        return TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [ MatMenuModule, RouterTestingModule.withRoutes(routes) ],
            providers: [{
                provide: JsonLoaderService,
                useValue: jsl
            }],
            schemas: [ NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(app).toBeTruthy();
    });

    it(`should not activate form when empty string`, () => {
        expect(app.formActive).toBeFalsy();
        app.generateForm('');
        expect(app.formActive).toBeFalsy();
    });

    it(`should activate form`, () => {
        expect(app.formActive).toBeFalsy();
        app.generateForm('{}');
        expect(app.formActive).toBeTruthy();
    });

    it(`should not activate form when bad json`, () => {
        expect(app.formActive).toBeFalsy();
        app.generateForm('{a:}');
        expect(app.formActive).toBeFalsy();
        expect(app.jsonFormStatusMessage).toContain('JavaScript parser returned');
    });

    it('should fetch example and generate form', () => {
        spyOn(app, 'generateForm');
        app.loadSelectedExample();
        getTestScheduler().flush();
        expect(app.generateForm).toHaveBeenCalledWith(JSON.stringify(example));
    });

    it('should navigate to the loaded example', fakeAsync(() => {
        const router: Router = TestBed.get(Router);
        const location: Location = TestBed.get(Location);
        router.initialNavigation();
        app.loadSelectedExample('ngx', 'b', 'c', 'd');
        tick();
        expect(location.path()).toBe('/?set=a&example=c');
    }));
});
