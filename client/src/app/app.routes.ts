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
                path: 'resident-management',
                children: [
                    {
                        path: 'flats',
                        children: [
                            {
                                path: '',
                                component: HelperhomeComponent,
                            }
                        ],
                    },
                    {
                        path: 'helpdesk-setup',
                        children: [
                            {
                                path: '',
                                component: HelperhomeComponent,
                            }
                        ],
                    },
                    {
                        path: 'renovation-works',
                        children: [
                            {
                                path: '',
                                component: HelperhomeComponent,
                            }
                        ],
                    },
                    {
                        path: 'violation-setup',
                        children: [
                            {
                                path: '',
                                component: HelperhomeComponent,
                            }
                        ],
                    },
                    {
                        path: 'amenities',
                        children: [
                            {
                                path: '',
                                component: HelperhomeComponent,
                            }
                        ],
                    },
                ],
            },
            {
                path: 'staff-management',
                children: [
                    {
                        path: 'roles-&-departments',
                        children: [
                            {
                                path: '',
                                component: HelperhomeComponent,
                            }
                        ],
                    },
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
                    {
                        path: 'staff-directory',
                        children: [
                            {
                                path: '',
                                component: HelperhomeComponent,
                            }
                        ],
                    },
                ],
            },
            {
                path: 'work-management',
                children: [
                    {
                        path: 'assets',
                        children: [
                            {
                                path: '',
                                component: HelperhomeComponent,
                            }
                        ],
                    },
                    {
                        path: 'locations',
                        children: [
                            {
                                path: '',
                                component: HelperhomeComponent,
                            }
                        ],
                    },{
                        path: 'work-pacakages',
                        children: [
                            {
                                path: '',
                                component: HelperhomeComponent,
                            }
                        ],
                    },
                    {
                        path: 'work-scheduler',
                        children: [
                            {
                                path: '',
                                component: HelperhomeComponent,
                            }
                        ],
                    },
                    {
                        path: 'work-logs',
                        children: [
                            {
                                path: '',
                                component: HelperhomeComponent,
                            }
                        ],
                    },{
                        path: 'issues',
                        children: [
                            {
                                path: '',
                                component: HelperhomeComponent,
                            }
                        ],
                    },
                ],
            },

        ],
    },
];
