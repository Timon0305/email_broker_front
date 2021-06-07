import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

export const appRoutes: Route[] = [

    {path: '', pathMatch : 'full', redirectTo: 'email'},

    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'email'},

    {
        path       : '',
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [

            {path: 'pages', children: [
                {path: 'authentication', loadChildren: () => import('app/modules/admin/pages/authentication/authentication.module').then(m => m.AuthenticationModule)},
            ]},

            {path: 'email', children: [
                    {path: '', loadChildren: () => import('app/modules/admin/ui/forms/layouts/layouts.module').then(m => m.FormsLayoutsModule)},
            ]},

            {path: '**', redirectTo: ''}
        ]
    }
];
