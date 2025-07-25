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
  readonly Search = Search;
  readonly X = X;
  readonly ChevronUp = ChevronUp;
  readonly ChevronRight = ChevronRight;
  searchText: string = '';
  // choice 1: show total data initially : 8 results
  // choice 2: show only filteredData : 5 of 8 results
  resultData: string = "5 of 8 results";

  dashboard = [
    {heading: "RESIDENT MANAGEMENT", childs: ["Flats", "Helpdesk Setup", "Helpdesk Tickets", "Renovation Works", "Violation Setup", "Amenities"]},
    {heading: "STAFF MANAGEMENT", childs: ["Roles & Departments", "Staff Directory", "Helpers"]}, 
    {heading: "WORK MANAGEMENT", childs: ["Assets", "Locations", "Work Pacakages", "Work Scheduler", "Work Logs", "Issues"]},
    {heading: "RESIDENT MANAGEMENT", childs: ["Flats", "Helpdesk Setup", "Helpdesk Tickets", "Renovation Works", "Violation Setup", "Amenities"]},
    {heading: "STAFF MANAGEMENT", childs: ["Roles & Departments", "Staff Directory", "Helpers"]}, 
  //  {heading: "SECURITY OPERATIONS", childs: ["Security"]},
  // {heading: "RESIDENT MANAGEMENT", childs: ["Flats", "Helpdesk Setup", "Helpdesk Tickets", "Renovation Works", "Violation Setup", "Amenities"]},
  //   {heading: "STAFF MANAGEMENT", childs: ["Roles & Departments", "Staff Directory", "Helpers"]}  ]
]
    removeSearchText(): void {
    this.searchText = '';
    }
}
