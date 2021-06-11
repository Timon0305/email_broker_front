import {Route} from '@angular/router';
import {LayoutComponent} from 'app/layout/layout.component';
import {InitialDataResolver} from 'app/app.resolvers';

export const appRoutes: Route[] = [

    {path: '', pathMatch: 'full', redirectTo: 'email'},

    {path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'email'},

    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: '', children: [
                    {
                        path: '',
                        loadChildren: () => import('app/modules/admin/layouts.module').then(m => m.FormsLayoutsModule)
                    },
                ]
            },
            {
                path: 'vendor', children: [
                    {
                        path: '',
                        loadChildren: () => import('app/modules/vendor/vendor.module').then(m => m.VendorModule)
                    }
                ]
            },

            {path: '**', redirectTo: ''}
        ]
    }
];
