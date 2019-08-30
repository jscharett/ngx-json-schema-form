import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { DataEventPluginService } from './services/data-event-plugin.service';

@NgModule({
    imports: [
        CommonModule
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [{
                multi: true,
                provide: EVENT_MANAGER_PLUGINS,
                useClass: DataEventPluginService
            }]
        };
    }
}
