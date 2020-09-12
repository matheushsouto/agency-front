import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './_guards';
import {SiteLayoutComponent} from './_layout/site-layout/site-layout.component';
import {AppLayoutComponent} from './_layout/app-layout/app-layout.component';
import {Route} from './app-const';

const routes: Routes = [
    {
        path: 'admin',
        canActivate: [AuthGuard],
        component: AppLayoutComponent,

        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'hospede',
                loadChildren: () => import('./guest/module').then(m => m.Module),
                data: {slug: Route.PERSONA_GUEST}, canActivate: [AuthGuard],
            },
            {
                path: 'gerente',
                loadChildren: () => import('./manager/module').then(m => m.Module),
                data: {slug: Route.PERSONA_MANAGER}, canActivate: [AuthGuard],
            },
            {
                path: 'agente',
                loadChildren: () => import('./agent/module').then(m => m.Module),
                data: {slug: Route.PERSONA_AGENT}, canActivate: [AuthGuard],
            },
            {
                path: 'atendente',
                loadChildren: () => import('./attendant/module').then(m => m.Module),
                data: {slug: Route.PERSONA_ATTENDANT}, canActivate: [AuthGuard]
            },
            {
                path: 'hotel',
                loadChildren: () => import('./hotel/module').then(m => m.Module),
                data: {slug: Route.BOOKING_HOTEL}, canActivate: [AuthGuard]
            },
            {
                path: 'quarto',
                loadChildren: () => import('./bedroom/module').then(m => m.Module),
                data: {slug: Route.BOOKING_BEDROOM}, canActivate: [AuthGuard]
            },
            {
                path: 'reserva',
                loadChildren: () => import('./reserva/module').then(m => m.Module),
                data: {slug: Route.BOOKING_RESERVA}, canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: '',
        component: SiteLayoutComponent,
        children: [{path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)}]
    },
    {
        path: 'esqueceu-senha',
        component: SiteLayoutComponent,
        children: [{path: '', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)}]
    },
    {
        path: '**',
        loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
    },
    {path: 'login', loadChildren: './login/login.module#LoginModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
