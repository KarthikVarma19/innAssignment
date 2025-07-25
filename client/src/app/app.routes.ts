import { Routes } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { HelperhomeComponent } from './modules/helper-module/pages/helperhome/helperhome.component';
import { AddhelperComponent } from './modules/helper-module/pages/addhelper/addhelper.component';
import { AddhelperskeletonComponent } from './modules/helper-module/components/addhelperskeleton/addhelperskeleton.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        children: [
            {
                path: 'staff-management',
                children: [
                    {
                        path: 'helpers',
                        children: [
                            {
                                path: '',
                                component: HelperhomeComponent,
                            }
                            ,
                            {
                                path: 'add-helper',
                                component: AddhelperskeletonComponent,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
