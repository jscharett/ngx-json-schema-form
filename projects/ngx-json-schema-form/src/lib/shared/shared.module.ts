import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutDirective } from './directives/layout.directive';

@NgModule({
    declarations: [ LayoutDirective ],
    exports: [ LayoutDirective ],
    imports: [ CommonModule ]
})
export class SharedModule { }
