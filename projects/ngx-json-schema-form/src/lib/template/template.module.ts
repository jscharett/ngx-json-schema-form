import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateComponent } from './template.component';

@NgModule({
    declarations: [ TemplateComponent ],
    entryComponents: [ TemplateComponent ],
    exports: [ TemplateComponent ],
    imports: [ CommonModule ]
})
export class TemplateModule { }
