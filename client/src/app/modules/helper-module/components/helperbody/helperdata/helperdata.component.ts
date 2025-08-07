import { NgFor, NgStyle, NgIf } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { HelperService } from '../../../services/helper.services';
import { HelperSection, IHelperProfileSummary } from '../../../adapters/helperdata-adapter';
@Component({
  selector: 'app-helperdata',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, NgStyle, NgFor, NgIf, RouterModule],
  templateUrl: './helperdata.component.html',
  styleUrl: './helperdata.component.scss',
})
export class HelperdataComponent implements OnInit {
  @Input() helperDisplayData: IHelperDataComponentInput;

  helperSections: HelperSection[];
  helperHeaderInfo: IHelperProfileSummary;

  constructor(private helperService: HelperService) {
    this.helperSections = [];
    this.helperHeaderInfo = {
      helperName: '',
      helperSubtitle: '',
      helperImage: '',
      helperHouseholds: 0,
    };
    this.helperDisplayData = {
      context: 'preview',
      data: null,
    };
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['helperDisplayData']?.currentValue?.data !==
        changes['helperDisplayData']?.previousValue?.data ||
      changes['helperDisplayData']?.currentValue?.context !==
        changes['helperDisplayData']?.previousValue?.context
    ) {
      const context = this.helperDisplayData.context;
      const data = this.helperDisplayData.data;
      if (context === 'edit' || context === 'preview' || context === 'admin') {
        const transformedData = this.helperService.getDataTransformed(
          context,
          data
        );
        this.helperHeaderInfo = transformedData.helperHeaderInfo;
        this.helperSections = transformedData.sections;
      }
    }
  }

  deleteHelper(_helperObjectId: string): void {
    this.helperService.deleteHelper(_helperObjectId).subscribe((res) => console.log(res));
  }

  isDataIsValidUrl(data: string): boolean {
    try {
      new URL(data);
      return true;
    } catch (error) {
      return false;
    }
  }

}

interface IHelperDataComponentInput {
  context: 'edit' | 'preview' | 'admin';
  data: any;
}



/* 

Backend Data

{
  "personalDetails": {
      "kycDocument": {
          "type": "Voter Id",
          "url": "https://kyc.example.com/kavya_voter.pdf"
      },
      "fullName": "Kavya Patel",
      "gender": "Female",
      "languages": [
          "Gujarati",
          "English"
      ],
      "phone": "9876543232",
      "email": "kavya.patel@example.com",
      "additionalDocuments": []
  },
  "serviceDetails": {
      "type": "Cook",
      "organization": "CityCare",
      "assignedHouseholds": [
          "HH-1230",
          "HH-1231",
          "HH-1232"
      ],
      "joinedOn": "2023-11-07T00:00:00.000Z"
  },
  "vehicleDetails": {
      "type": "None"
  },
  "_id": "688c6b6b39a3dd9fdb50b439",
  "employee": {
      "_id": "688c6b6a39a3dd9fdb50b41d",
      "employeeId": "EMP-103",
      "employeephotoUrl": "https://randomuser.me/api/portraits/women/6.jpg",
      "identificationCardUrl": "https://cdn.example.com/idcards/emp103.png"
  },
  "createdAt": "2025-08-01T07:23:23.319Z",
  "updatedAt": "2025-08-01T07:23:23.319Z",
  "__v": 0
}



*/