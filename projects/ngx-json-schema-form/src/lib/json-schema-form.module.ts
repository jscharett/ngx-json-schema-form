import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { WidgetLibraryModule } from './widget-library/widget-library.module';

import { DataEventPluginService } from './data-event-plugin.service';
import { JsonSchemaFormComponent } from './json-schema-form.component';

@NgModule({
    declarations: [ JsonSchemaFormComponent ],
    exports: [ JsonSchemaFormComponent, WidgetLibraryModule ],
    imports: [ CommonModule, WidgetLibraryModule ]
})
export class JsonSchemaFormModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: JsonSchemaFormModule,
            providers: [{
                multi: true,
                provide: EVENT_MANAGER_PLUGINS,
                useClass: DataEventPluginService
            }]
        };
    }
}
