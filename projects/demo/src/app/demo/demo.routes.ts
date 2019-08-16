import { Routes } from '@angular/router';

import { DemoComponent } from './demo.component';

export const routes: Routes = [
    {
        component: DemoComponent,
        path: ''
    },
    {
        component: DemoComponent,
        path: '**'
    }
];
