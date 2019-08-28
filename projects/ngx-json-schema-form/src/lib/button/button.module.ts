import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from './button.component';

@NgModule({
    declarations: [ ButtonComponent ],
    entryComponents: [ ButtonComponent ],
    exports: [ ButtonComponent ],
    imports: [ CommonModule ]
})
export class ButtonModule { }
