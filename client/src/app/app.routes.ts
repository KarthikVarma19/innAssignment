import { Routes } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { HelperhomeComponent } from './modules/helper-module/pages/helperhome/helperhome.component';
import { PagenotfoundComponent } from './shared/components/pagenotfound/pagenotfound.component';
import { AddhelperComponent } from './modules/helper-module/pages/addhelper/addhelper.component';
import { EditHelperComponent } from './modules/helper-module/pages/edit-helper/edit-helper.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    title: 'Manage By ASBL Homes',
    children: [
      {
        path: 'staff-management',
        title: 'Staff Management',
        children: [
          {
            path: 'helpers',
            title: 'Helpers',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
              },
              {
                path: 'add-helper',
                component: AddhelperComponent,
              },
              {
                path: 'edit-helper/:id',
                component: EditHelperComponent,

              },
            ],
          }
        ],
      }
    ],
  },
  {
    path: '**',
    title: 'Page Not Found 404',
    component: PagenotfoundComponent,
  },
];
