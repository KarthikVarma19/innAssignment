import { Routes } from '@angular/router';
import { HelperhomeComponent } from './modules/helper-module/pages/helper-home/helper-home.component';
import { PagenotfoundComponent } from './shared/components/pagenotfound/pagenotfound.component';
import { AddhelperComponent } from './modules/helper-module/pages/add-helper/add-helper.component';
import { EditHelperComponent } from './modules/helper-module/pages/edit-helper/edit-helper.component';
import { pendingChangesGuard } from './shared/guards/pending-changes.guard';
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
                canDeactivate: [pendingChangesGuard],
              },
              {
                path: 'edit-helper/:id',
                component: EditHelperComponent,
                canDeactivate: [pendingChangesGuard],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '**',
    title: 'Page Not Found 404',
    component: PagenotfoundComponent,
  },
];
