/**
 * Created on 09.09.2016.
 */

import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {AddPhotoComponent} from "./components/add-photo/add-photo.component";

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
        component: AddPhotoComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);