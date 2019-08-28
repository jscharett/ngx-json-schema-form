import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectWidgetComponent } from './container/select-widget/select-widget.component';

/** List of all Widget Components for ease of use. */
export const BASIC_WIDGETS = [
    SelectWidgetComponent
];

@NgModule({
    declarations: [ ...BASIC_WIDGETS ],
    entryComponents: [ ...BASIC_WIDGETS ],
    exports: [ ...BASIC_WIDGETS ],
    imports: [ CommonModule, ReactiveFormsModule ]
})
export class WidgetLibraryModule { }
