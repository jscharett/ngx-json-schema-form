import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HiddenComponent } from './hidden.component';

@NgModule({
    declarations: [ HiddenComponent ],
    entryComponents: [ HiddenComponent ],
    exports: [ HiddenComponent ],
    imports: [ CommonModule ]
})
export class HiddenModule { }
