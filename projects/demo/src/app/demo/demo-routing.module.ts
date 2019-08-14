import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './demo.routes';

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forChild(routes) ]
})
export class DemoRoutingModule { }
