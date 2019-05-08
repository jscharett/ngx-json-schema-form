import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BASIC_WIDGETS } from '.';

@NgModule({
    declarations: [ ...BASIC_WIDGETS ],
    entryComponents: [ ...BASIC_WIDGETS ],
    exports: [ ...BASIC_WIDGETS ],
    imports: [ CommonModule ]
})
export class WidgetLibraryModule { }
