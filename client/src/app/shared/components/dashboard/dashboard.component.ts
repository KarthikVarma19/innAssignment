import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  Search,
  X,
  ChevronUp,
  ChevronRight,
} from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    LucideAngularModule,
    FormsModule,
    NgIf,
    NgFor,
    RouterLink,
    MatCardModule,
    NgStyle,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  appEnvironment: string = 'DEV';
  readonly Search = Search;
  readonly X = X;
  readonly ChevronUp = ChevronUp;
  readonly ChevronRight = ChevronRight;
  searchText: string = '';
  // choice 1: show total data initially : 8 results
  // choice 2: show only filteredData : 5 of 8 results
  resultData: string = '5 of 8 results';

  dashboard: Dashboard[] = [
    {
      heading: 'RESIDENT MANAGEMENT',
      childs: [
        { name: 'Flats', icon: 'apartment' },
        { name: 'Helpdesk Setup', icon: 'headset_mic' },
        { name: 'Helpdesk Tickets', icon: 'confirmation_number' },
        { name: 'Renovation Works', icon: 'construction' },
        { name: 'Violation Setup', icon: 'gavel' },
        { name: 'Violation Tickets', icon: 'report_problem' },
        { name: 'Amenities', icon: 'self_improvement' },
      ],
    },
    {
      heading: 'STAFF MANAGEMENT',
      childs: [
        { name: 'Roles & Departments', icon: 'account_tree' },
        { name: 'Staff Directory', icon: 'shield_person' },
        { name: 'Helpers', icon: 'cleaning_services' },
      ],
    },

    {
      heading: 'WORK MANAGEMENT',
      childs: [
        { name: 'Assets', icon: 'inventory_2' },
        { name: 'Locations', icon: 'location_on' },
        { name: 'Work Packages', icon: 'check_box' },
        { name: 'Work Scheduler', icon: 'schedule' },
        { name: 'Work Logs', icon: 'history' },
        { name: 'Issues', icon: 'warning' },
      ],
    },
  ];

  filteredDashboard: Dashboard[];

  constructor() {
    this.filteredDashboard = this.dashboard;
  }

  selectedChild: string | undefined;
  onChildClick(child: string) {
    this.selectedChild = child;
  }

  searchFilterInDashboard() {
    this.filteredDashboard = this.filteredDashboard
      .map((section) => ({
        ...section,
        childs: section.childs.filter((child) =>
          child.name.toLowerCase().includes(this.searchText.toLowerCase())
        ),
      }))
      .filter((section) => section.childs.length > 0);
  }

  disabledItems: Set<any> = new Set();

  toggleChildContainer(item: any): void {
    if (this.disabledItems.has(item)) {
      this.disabledItems.delete(item);
    } else {
      this.disabledItems.add(item);
    }
  }

  isItemDisabled(item: any): boolean {
    return this.disabledItems.has(item);
  }

  removeSearchText(): void {
    this.searchText = '';
    this.filteredDashboard = this.dashboard;
  }
}

export interface Child {
  name: string;
  icon: string;
}

export interface Dashboard {
  heading: string;
  childs: Child[];
}
