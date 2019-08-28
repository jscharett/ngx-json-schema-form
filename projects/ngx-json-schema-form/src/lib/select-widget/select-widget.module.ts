import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SelectWidgetComponent } from './select-widget.component';

@NgModule({
    declarations: [ SelectWidgetComponent ],
    entryComponents: [ SelectWidgetComponent ],
    exports: [ SelectWidgetComponent ],
    imports: [ CommonModule ]
})
export class SelectWidgetModule { }
