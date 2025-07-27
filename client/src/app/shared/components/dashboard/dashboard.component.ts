import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Search, X, ChevronUp, ChevronRight} from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, NgIf, NgFor, RouterLink,MatCardModule, NgStyle],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  appEnvironment: string = "TEST";
  readonly Search = Search;
  readonly X = X;
  readonly ChevronUp = ChevronUp;
  readonly ChevronRight = ChevronRight;
  searchText: string = '';
  // choice 1: show total data initially : 8 results
  // choice 2: show only filteredData : 5 of 8 results
  resultData: string = "5 of 8 results";

  dashboard = [
    {
      heading: "RESIDENT MANAGEMENT",
      childs: [
        { name: "Flats", icon: "apartment" },
        { name: "Helpdesk Setup", icon: "headset_mic" },
        { name: "Helpdesk Tickets", icon: "confirmation_number" },
        { name: "Renovation Works", icon: "construction" },
        { name: "Violation Setup", icon: "gavel" },
        { name: "Violation Tickets", icon: "report" },
        { name: "Amenities", icon: "sports_handball" }
      ]
    },
    {
      heading: "STAFF MANAGEMENT",
      childs: [
        { name: "Roles & Departments", icon: "account_tree" },
        { name: "Staff Directory", icon: "shield_person" },
        { name: "Helpers", icon: "cleaning_services" }
      ]
    },
    
    {
      heading: "WORK MANAGEMENT",
      childs: [
        { name: "Assets", icon: "inventory" },
        { name: "Locations", icon: "location_on" },
        { name: "Work Packages", icon: "check_box" },
        { name: "Work Scheduler", icon: "schedule" },
        { name: "Work Logs", icon: "history" },
        { name: "Issues", icon: "warning" }
      ]
    }
  ];

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
    }
}
