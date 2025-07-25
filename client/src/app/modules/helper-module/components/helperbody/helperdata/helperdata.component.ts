import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LucideAngularModule, Trash2, Pencil } from 'lucide-angular';
@Component({
  selector: 'app-helperdata',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, NgStyle, LucideAngularModule, NgFor],
  templateUrl: './helperdata.component.html',
  styleUrl: './helperdata.component.scss'
})
export class HelperdataComponent {
  helper = {
    helperName: 'Aarav Mehta',
    helperSubtitle: 'Electrician',
    helperImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    helperHouseholds: 5,
  };
  readonly Trash2 = Trash2;
  readonly Pencil = Pencil;
  employeeDetails = [
  {
    sectionTitle: "EMPLOYEE ID",
    fields: [
      { label: "Identification Card", data: "View" },
      { label: "Employee Code", data: 10999 }
    ]
  },
  {
    sectionTitle: "PERSONAL DETAILS",
    fields: [
      { label: "Gender", data: "Male" },
      { label: "Language(s)", data: "English, Telugu" },
      { label: "Mobile No.", data: "+91 96765 02330" },
      { label: "Email ID", data: "-" },
      { label: "KYC Document", data: "View" }
    ]
  },
  {
    sectionTitle: "SERVICE DETAILS",
    fields: [
      { label: "Type", data: "None" },
      { label: "Organization", data: "ASBL" },
      { label: "Joined On", data: "15 May, 2025" }
    ]
  }
  ];
}
