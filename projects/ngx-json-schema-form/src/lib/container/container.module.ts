import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ContainerComponent } from './container.component';

@NgModule({
    declarations: [ ContainerComponent ],
    entryComponents: [ ContainerComponent ],
    exports: [ ContainerComponent ],
    imports: [ CommonModule, SharedModule ]
})
export class ContainerModule { }
