/**
 * Created on 09.09.2016.
 */

import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {AddPhotoComponent} from "./components/add-photo/add-photo.component";
import {RegisterUserComponent} from "./components/register-user/register-user.component";
import {LoginUserComponent} from "./components/login-user/login-user.component";
import {LoggedInGuard} from "./guards/logged-in.guard";
import {DetailUserComponent} from "./components/detail-user/detail-user.component";

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'add',
        component: AddPhotoComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'register',
        component: RegisterUserComponent
    },
    {
        path: 'login',
        component: LoginUserComponent
    },
    {
        path: 'user/:name',
        component: DetailUserComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);