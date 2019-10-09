import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SelectWidgetsDirective } from './directives/select-widgets.directive';

@NgModule({
    declarations: [ SelectWidgetsDirective ],
    exports: [ SelectWidgetsDirective ],
    imports: [ CommonModule ]
})
export class SharedModule { }
