import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CrudComponent } from './pages/crud/crud.component';

const app_routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'crud', component: CrudComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot( app_routes, { useHash: true } );