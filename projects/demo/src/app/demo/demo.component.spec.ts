import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { cold, getTestScheduler } from 'jasmine-marbles';

import examples from '../../assets/examples/examples.json';
import example from '../../assets/examples/ngx/simple-array.json';

import { JsonLoaderService } from '../json-loader.service';

import { DemoComponent } from './demo.component';
import { routes } from './demo.routes';


describe('DemoComponent', () => {
    let fixture: ComponentFixture<DemoComponent>;
    let component: DemoComponent;

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
                DemoComponent
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
        fixture = TestBed.createComponent(DemoComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it(`should not activate form when empty string`, () => {
        expect(component.formActive).toBeFalsy();
        component.generateForm('');
        expect(component.formActive).toBeFalsy();
    });

    it(`should activate form`, () => {
        expect(component.formActive).toBeFalsy();
        component.generateForm('{}');
        expect(component.formActive).toBeTruthy();
    });

    it(`should not activate form when bad json`, () => {
        expect(component.formActive).toBeFalsy();
        component.generateForm('{a:}');
        expect(component.formActive).toBeFalsy();
        expect(component.jsonFormStatusMessage).toContain('JavaScript parser returned');
    });

    it('should fetch example and generate form', () => {
        spyOn(component, 'generateForm');
        component.loadSelectedExample();
        getTestScheduler().flush();
        expect(component.generateForm).toHaveBeenCalledWith(JSON.stringify(example));
    });

    it('should navigate to the loaded example', fakeAsync(() => {
        const router: Router = TestBed.get(Router);
        const location: Location = TestBed.get(Location);
        router.initialNavigation();
        component.loadSelectedExample('ngx', 'b', 'c', 'd');
        tick();
        expect(location.path()).toBe('/?set=ngx&example=c');
    }));

    it('should run onClick function', () => {
        const layout = {onClick: 'alert("Cats");'};
        spyOn(console, 'warn');
        spyOn(window, 'alert');
        component.onClick(layout);
        expect(console.warn).toHaveBeenCalledWith(layout);
        expect(window.alert).toHaveBeenCalledWith('Cats');
    });

    it('should not run onClick function', () => {
        const event = {};
        spyOn(console, 'warn');
        spyOn(window, 'alert');
        component.onClick(event);
        expect(console.warn).toHaveBeenCalledWith(event);
        expect(window.alert).not.toHaveBeenCalled();
    });
});
