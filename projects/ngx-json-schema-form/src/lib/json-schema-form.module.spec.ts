import { TestBed } from '@angular/core/testing';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { DataEventPluginService } from './core/services/data-event-plugin.service';

import { JsonSchemaFormModule } from './json-schema-form.module';

describe('JsonSchemaFormModule', () => {
    describe('default', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ JsonSchemaFormModule ]
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
                imports: [ JsonSchemaFormModule.forRoot() ]
            });
        });

        it('should provide "DataEventPluginService" service', () => {
            const plugins: Array<any> = TestBed.get(EVENT_MANAGER_PLUGINS);
            expect(plugins).toContain(jasmine.any(DataEventPluginService));
        });
    });
});

