import { Route } from '@angular/router';

import { AppComponent } from './app.component';

export const routes: Array<Route> = [
    { path: '', component: AppComponent },
    { path: '**', component: AppComponent }
];
