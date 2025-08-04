import { HelperdataComponent } from './helperdata/helperdata.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../../services/helper.services';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-helperbody',
  standalone: true,
  imports: [
    HelperdataComponent,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './helperbody.component.html',
  styleUrl: './helperbody.component.scss',
})
export class HelperbodyComponent implements OnInit {
  helpersData: any[] = [];
  filteredHelperData: any[] = [];
  helperDetails: any;


  constructor(private helperService: HelperService) {}

  getHelperDetails(_helperObjectId: string) {
    // if it is already the same data that is already in view
    if (this.helperDetails?._id === _helperObjectId) return;
    this.helperDetails = this.helpersData.find(
      (helper) => helper._id === _helperObjectId
    );
  }

  ngOnInit(): void {
    this.helperService.getAllHelpers().subscribe((data) => {
      this.helpersData = data;
      this.helperDetails = this.helpersData[0];
    });
  }

  searchText: string = '';
  // choice 1: show total data initially : 8 helpers
  // choice 2: show only filteredData : 5 of 8 helpers

  removeSearchText(): void {
    this.searchText = '';
    this.helperDetails = this.helpersData[0];
  }
  searchForHelper(): void {
    this.filteredHelperData = this.helpersData.filter(
      (helper) =>
        helper.personalDetails?.fullName
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        helper.employee?.employeeId
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        helper.personalDetails?.phone
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
    );
    
    this.helperDetails = this.filteredHelperData[0];
  }
}
