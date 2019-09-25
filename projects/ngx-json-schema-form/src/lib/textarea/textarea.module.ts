import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TextareaComponent } from './textarea.component';

@NgModule({
    declarations: [ TextareaComponent ],
    entryComponents: [ TextareaComponent ],
    exports: [ TextareaComponent ],
    imports: [ CommonModule ]
})
export class TextareaModule { }
