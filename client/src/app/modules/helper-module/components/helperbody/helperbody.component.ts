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
  helpersData: any[];
  filteredHelperData: any[];
  helperDetails: any;


  constructor(private helperService: HelperService) {
    this.helpersData = [];
    this.filteredHelperData = [];
    this.helperDetails = {
      context: 'admin',
      data: null,
    };
  }

  getHelperDetails(_helperObjectId: string) {
    // if it is already the same data that is already in view
    if (this.helperDetails.data._id === _helperObjectId) return;

    const foundData = this.helpersData.find(
      (helper) => helper._id === _helperObjectId
    );

    this.helperDetails = {
      ...this.helperDetails,
      data: foundData,
    };
  }

  ngOnInit(): void {
    this.helperService.getAllHelpers().subscribe((subdata) => {
      this.helpersData = subdata;
      this.helperDetails = { data: this.helpersData[0], context: 'admin' };
    });
  }

  getSafeImageUrl(helper: any) {

    const image = helper.employee?.employeephotoUrl;
    if (!image || image.trim() === '') {
      return `https://ui-avatars.com/api/?name=${helper.personalDetails.fullName}&background=random&color=fff&rounded=true&bold=true&size=32`;
    }

    return image;
  }


  searchText: string = '';
  // choice 1: show total data initially : 8 helpers
  // choice 2: show only filteredData : 5 of 8 helpers

  removeSearchText(): void {
    this.searchText = '';
    this.helperDetails = { data: this.helpersData[0], context: 'admin' };
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
    
    this.helperDetails = { data: this.filteredHelperData[0], context: 'admin' };
  }
}
