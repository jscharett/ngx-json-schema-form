import { TestBed } from '@angular/core/testing';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { DataEventPluginService } from './services/data-event-plugin.service';

import { CoreModule } from './core.module';

describe('CoreModule', () => {
    describe('default', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ CoreModule ]
            });
        });

        it('should not provide "DataEventPluginService" service', () => {
            const plugins: Array<any> = TestBed.get(EVENT_MANAGER_PLUGINS);
            expect(plugins).not.toContain(jasmine.any(DataEventPluginService));
        });
    });

    describe('forRoot', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ CoreModule.forRoot() ]
            });
        });

        it('should provide "DataEventPluginService" service', () => {
            const plugins: Array<any> = TestBed.get(EVENT_MANAGER_PLUGINS);
            expect(plugins).toContain(jasmine.any(DataEventPluginService));
        });
    });
});
