import { Route } from '@angular/router';

export const routes: Array<Route> = [
    {
        loadChildren: './demo/demo.module#DemoModule',
        path: ''
    },
    {
        loadChildren: './demo/demo.module#DemoModule',
        path: '**'
    }
];
