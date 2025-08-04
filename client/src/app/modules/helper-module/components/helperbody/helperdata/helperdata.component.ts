import { NgFor, NgStyle, NgIf } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { HelperService } from '../../../services/helper.services';
@Component({
  selector: 'app-helperdata',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgStyle,
    NgFor,
    NgIf,
    RouterModule,
  ],
  templateUrl: './helperdata.component.html',
  styleUrl: './helperdata.component.scss',
})
export class HelperdataComponent implements OnInit {
  STATIC_HELPER = {
    helperName: 'Helper Name',
    helperSubtitle: 'Helper Subtitle',
    helperImage: 'Helper Image',
    helperHouseholds: 0,
  };

  helper = {
    helperName: 'Helper Name',
    helperSubtitle: 'Helper Subtitle',
    helperImage: 'Helper Image',
    helperHouseholds: 0,
  };

  constructor(private helperService: HelperService) {}

  helpersDetails: any = {};
  @Input() helperData: any = {};

  STATIC_HELPERDETAILS: any = [
    {
      sectionTitle: 'EMPLOYEE ID',
      fields: [
        { label: 'Identification Card', data: 'View' },
        { label: 'Employee Code', data: '1' },
      ],
    },
    {
      sectionTitle: 'PERSONAL DETAILS',
      fields: [
        {
          label: 'Gender',
          data: this.helpersDetails?.personalDetails?.gender || '-',
        },
        {
          label: 'Language(s)',
          data:
            this.helpersDetails?.personalDetails?.languages?.join(', ') || '-',
        },
        {
          label: 'Mobile No.',
          data: this.helpersDetails?.personalDetails?.phone || '-',
        },
        {
          label: 'Email ID',
          data: this.helpersDetails?.personalDetails?.email || '-',
        },
        {
          label: 'KYC Document',
          data: this.helpersDetails?.personalDetails?.kycDocument?.url
            ? 'View'
            : '-',
        },
      ],
    },
    {
      sectionTitle: 'SERVICE DETAILS',
      fields: [
        {
          label: 'Type',
          data: this.helpersDetails?.serviceDetails?.type || 'None',
        },
        {
          label: 'Organization',
          data: this.helpersDetails?.serviceDetails?.organization || '-',
        },
        {
          label: 'Joined On',
          data: this.helpersDetails?.serviceDetails?.joinedOn
            ? new Date(
                this.helpersDetails.serviceDetails.joinedOn
              ).toLocaleDateString()
            : '-',
        },
      ],
    },
  ];

  helperDetails: any = [
    {
      sectionTitle: 'EMPLOYEE ID',
      fields: [
        { label: 'Identification Card', data: 'View' },
        { label: 'Employee Code', data: '1' },
      ],
    },
    {
      sectionTitle: 'PERSONAL DETAILS',
      fields: [
        {
          label: 'Gender',
          data: this.helpersDetails?.personalDetails?.gender || '-',
        },
        {
          label: 'Language(s)',
          data:
            this.helpersDetails?.personalDetails?.languages?.join(', ') || '-',
        },
        {
          label: 'Mobile No.',
          data: this.helpersDetails?.personalDetails?.phone || '-',
        },
        {
          label: 'Email ID',
          data: this.helpersDetails?.personalDetails?.email || '-',
        },
        {
          label: 'KYC Document',
          data: this.helpersDetails?.personalDetails?.kycDocument?.url
            ? 'View'
            : '-',
        },
      ],
    },
    {
      sectionTitle: 'SERVICE DETAILS',
      fields: [
        {
          label: 'Type',
          data: this.helpersDetails?.serviceDetails?.type || 'None',
        },
        {
          label: 'Organization',
          data: this.helpersDetails?.serviceDetails?.organization || '-',
        },
        {
          label: 'Joined On',
          data: this.helpersDetails?.serviceDetails?.joinedOn
            ? new Date(
                this.helpersDetails.serviceDetails.joinedOn
              ).toLocaleDateString()
            : '-',
        },
      ],
    },
  ];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // find the index of the employee index
    // find the index of hte personal details
    // find the index of the service details

    if (this.helperData !== undefined) {
      // Helper Header Container Data
      this.helper.helperName = this.helperData.personalDetails.fullName;
      this.helper.helperSubtitle = this.helperData.serviceDetails.type;
      this.helper.helperImage = this.helperData.employee.employeephotoUrl;

      // Employee ID
      this.helperDetails[0].fields[0].data =
        this.helperData.employee.identificationCardUrl;
      this.helperDetails[0].fields[1].data =
        this.helperData.employee.employeeId;
      // Personal Details
      this.helperDetails[1].fields[0].data =
        this.helperData.personalDetails.gender;
      this.helperDetails[1].fields[1].data =
        this.helperData.personalDetails.languages;
      this.helperDetails[1].fields[2].data =
        this.helperData.personalDetails.phone;
      this.helperDetails[1].fields[3].data =
        this.helperData.personalDetails.email;
      this.helperDetails[1].fields[4].data =
        this.helperData.personalDetails.kycDocument?.url;
      // Service Details
      this.helperDetails[2].fields[0].data =
        this.helperData.serviceDetails.type;
      this.helperDetails[2].fields[1].data =
        this.helperData.serviceDetails.organization;
      this.helperDetails[2].fields[2].data = new Date(
        this.helperData.serviceDetails.joinedOn
      ).toLocaleDateString('en-GB');
    }
  }

  deleteHelper() {
    this.helperService.deleteHelper(this.helperData._id).subscribe((res) => {});
  }
;

  isDataIsValidUrl(data: string) {
    try {
      new URL(data);
      return true;
    } catch (error) {
      return false;
    }
  }
}
