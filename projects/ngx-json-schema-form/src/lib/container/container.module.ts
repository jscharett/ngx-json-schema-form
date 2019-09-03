import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SelectWidgetModule } from '../select-widget/select-widget.module';

import { ContainerComponent } from './container.component';

@NgModule({
    declarations: [ ContainerComponent ],
    entryComponents: [ ContainerComponent ],
    exports: [ ContainerComponent ],
    imports: [ CommonModule, SelectWidgetModule ]
})
export class ContainerModule { }
