import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-helperslist',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, NgFor, NgClass, NgStyle],
  templateUrl: './helperslist.component.html',
  styleUrl: './helperslist.component.scss',
})
export class HelperslistComponent {
  helpers = [
    {
      helperName: 'Aarav Mehta',
      helperSubtitle: 'Electrician',
      helperImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      helperHouseholds: 5,
    },
    {
      helperName: 'Saanvi Sharma',
      helperSubtitle: 'Plumber',
      helperImage: 'https://randomuser.me/api/portraits/women/2.jpg',
      helperHouseholds: 3,
    },
    {
      helperName: 'Rohit Verma',
      helperSubtitle: 'Carpenter',
      helperImage: 'https://randomuser.me/api/portraits/men/3.jpg',
      helperHouseholds: 7,
    },
    {
      helperName: 'Neha Patel',
      helperSubtitle: 'Painter',
      helperImage: 'https://randomuser.me/api/portraits/women/4.jpg',
      helperHouseholds: 2,
    },
    {
      helperName: 'Vikram Singh',
      helperSubtitle: 'Gardener',
      helperImage: 'https://randomuser.me/api/portraits/men/5.jpg',
      helperHouseholds: 6,
    },
    {
      helperName: 'Ananya Iyer',
      helperSubtitle: 'Babysitter',
      helperImage: 'https://randomuser.me/api/portraits/women/6.jpg',
      helperHouseholds: 4,
    },
    {
      helperName: 'Ravi Kumar',
      helperSubtitle: 'Driver',
      helperImage: 'https://randomuser.me/api/portraits/men/7.jpg',
      helperHouseholds: 8,
    },
    {
      helperName: 'Meera Joshi',
      helperSubtitle: 'House Cleaner',
      helperImage: 'https://randomuser.me/api/portraits/women/8.jpg',
      helperHouseholds: 10,
    },
    {
      helperName: 'Aditya Rao',
      helperSubtitle: 'Technician',
      helperImage: 'https://randomuser.me/api/portraits/men/9.jpg',
      helperHouseholds: 3,
    },
    {
      helperName: 'Priya Desai',
      helperSubtitle: 'Cook',
      helperImage: 'https://randomuser.me/api/portraits/women/10.jpg',
      helperHouseholds: 5,
    },
    {
      helperName: 'Siddharth Malhotra',
      helperSubtitle: 'Security Guard',
      helperImage: 'https://randomuser.me/api/portraits/men/11.jpg',
      helperHouseholds: 9,
    },
    {
      helperName: 'Kavya Reddy',
      helperSubtitle: 'Tailor',
      helperImage: 'https://randomuser.me/api/portraits/women/12.jpg',
      helperHouseholds: 1,
    },
    {
      helperName: 'Mohit Sharma',
      helperSubtitle: 'Mason',
      helperImage: 'https://randomuser.me/api/portraits/men/13.jpg',
      helperHouseholds: 4,
    },
    {
      helperName: 'Ishita Jain',
      helperSubtitle: 'Nanny',
      helperImage: 'https://randomuser.me/api/portraits/women/14.jpg',
      helperHouseholds: 6,
    },
    {
      helperName: 'Devansh Kapoor',
      helperSubtitle: 'AC Mechanic',
      helperImage: 'https://randomuser.me/api/portraits/men/15.jpg',
      helperHouseholds: 7,
    },
  ];
}
