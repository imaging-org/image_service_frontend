import { Routes } from '@angular/router';

import { GalleryComponent } from '../components/gallery/gallery.component';
import { BatchesComponent } from '../components/batches/batches.component';
import { SimilarityComponent } from '../components/similarity/similarity.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { SigninComponent } from '../components/signin/signin.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'gallery',
        component: GalleryComponent,
        canActivate: [authGuard]
    },
    {
        path: 'batches',
        component: BatchesComponent,
        canActivate: [authGuard]
    },
    {
        path: 'similarity',
        component: SimilarityComponent,
        canActivate: [authGuard]
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [authGuard]
    },
    { 
        path: '',   
        redirectTo: '/signup', 
        pathMatch: 'full' 
    }
];
