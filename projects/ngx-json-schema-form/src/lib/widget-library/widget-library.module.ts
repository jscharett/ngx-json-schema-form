import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BASIC_WIDGETS } from '.';

@NgModule({
    declarations: [ ...BASIC_WIDGETS ],
    entryComponents: [ ...BASIC_WIDGETS ],
    exports: [ ...BASIC_WIDGETS ],
    imports: [ CommonModule, ReactiveFormsModule ]
})
export class WidgetLibraryModule { }
