import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        return TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [ MatMenuModule, RouterTestingModule ],
            schemas: [ NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app: AppComponent = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    // it(`should have as title 'demo'`, () => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     const app: AppComponent = fixture.debugElement.componentInstance;
    //     expect(app.title).toEqual('demo');
    // });

    // it('should render title in a h1 tag', () => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     fixture.detectChanges();
    //     const compiled: HTMLElement = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector('h1').textContent).toContain('Welcome to demo!');
    // });
});
