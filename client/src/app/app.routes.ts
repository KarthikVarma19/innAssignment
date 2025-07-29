import { Routes } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { HelperhomeComponent } from './modules/helper-module/pages/helperhome/helperhome.component';
import { PagenotfoundComponent } from './shared/components/pagenotfound/pagenotfound.component';
import { AddhelperComponent } from './modules/helper-module/pages/addhelper/addhelper.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    children: [
      {
        path: 'resident-management',
        title: 'Resident Management',
        children: [
          {
            path: 'flats',
            title: 'Flats',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
              },
            ],
          },
          {
            path: 'helpdesk-setup',
            title: 'Helpdesk Setup',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
              },
            ],
          },
          {
            path: 'helpdesk-tickets',
            title: 'Helpdesk Tickets',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
              },
            ],
          },
          {
            path: 'renovation-works',
            title: 'Renovation Works',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
              },
            ],
          },
          {
            path: 'violation-setup',
            title: 'Violation Setup',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
              },
            ],
          },
          {
            path: 'amenities',
            title: 'Amenities',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'staff-management',
        title: 'Staff Management',
        children: [
          {
            path: 'roles-&-departments',
            title: 'Roles & Departments',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
              },
            ],
          },
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
            ],
          },
          {
            path: 'staff-directory',
            title: 'Staff Directory',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'work-management',
        title: 'Work Management',
        children: [
          {
            path: 'assets',
            title: 'Assets',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
              },
            ],
          },
          {
            path: 'locations',
            title: 'Locations',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
              },
            ],
          },
          {
            path: 'work-packages',
            title: 'Work Packages',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
              },
            ],
          },
          {
            path: 'work-scheduler',
            title: 'Work Scheduler',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
              },
            ],
          },
          {
            path: 'work-logs',
            title: 'Work Logs',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
              },
            ],
          },
          {
            path: 'issues',
            title: 'Issues',
            children: [
              {
                path: '',
                component: HelperhomeComponent,
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
