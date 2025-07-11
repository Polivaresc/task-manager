import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { App } from './app';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'dashboard', component: App}
];
