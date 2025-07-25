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
    sectionTitle: "Employee Identification",
    fields: [
      { label: "ID Card", data: "View" },
      { label: "Employee Code", data: 10999 }
    ]
  },
  {
    sectionTitle: "Personal Information",
    fields: [
      { label: "Gender", data: "Male" },
      { label: "Languages Known", data: "English, Telugu" },
      { label: "Mobile Number", data: "+91 96765 02330" },
      { label: "Email Address", data: "-" },
      { label: "KYC Document", data: "View" }
    ]
  },
  {
    sectionTitle: "Employment Details",
    fields: [
      { label: "Service Type", data: "None" },
      { label: "Organization", data: "ASBL" },
      { label: "Date of Joining", data: "15 May, 2025" }
    ]
  }
  ];
}
