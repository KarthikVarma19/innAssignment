import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelperdataComponent } from '../../components/helperbody/helperdata/helperdata.component';
import { Router, RouterModule } from '@angular/router';
import { HelperService } from '../../services/helper.services';
import { HelperformComponent } from '../../components/helperform/helperform.component';
import { HelperUtilityService } from '../../services/helper-utility.services';

@Component({
  selector: 'app-addhelper',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HelperdataComponent,
    CommonModule,
    HelperformComponent,
    RouterModule,
  ],
  templateUrl: './addhelper.component.html',
  styleUrl: './addhelper.component.scss',
})
export class AddhelperComponent implements OnInit {
  currentStageOfAddingHelper: number = 1;
  finalStageOfAddingHelper: number = 3;

  selectTypeOfServiceOptions: { fieldName: string; fieldIcon: string }[] = [
    { fieldName: 'Maid', fieldIcon: 'cleaning_services' },
    { fieldName: 'Cook', fieldIcon: 'restaurant' },
    { fieldName: 'Nurse', fieldIcon: 'medical_services' },
    { fieldName: 'Driver', fieldIcon: 'directions_car' },
  ];
  organizationNameOptions: string[] = ['ASBL', 'Springs Helper'];
  vehicleTypeOptions: string[] = ['None', 'Auto', 'Car', 'Bike'];

  compiledHelperFormData: IHelperData;
  helperPresentationData: any;

  constructor(
    private helperService: HelperService,
    private cdr: ChangeDetectorRef,
    private helperUtility: HelperUtilityService,
    private router: Router
  ) {
    this.compiledHelperFormData = {
      personalDetails: {
        kycDocument: {
          type: '', // Assuming no mapping for kycDocument in the provided data
          url: '',
          filename: '',
          filesize: 0,
        },
        fullName: '',
        gender: '',
        languages: [],
        phone: '',
        email: '',
        additionalDocuments: [], // Assuming no mapping for additionalDocuments in the provided data
      },
      serviceDetails: {
        type: '',
        organization: '',
        assignedHouseholds: [], // Assuming no mapping for assignedHouseholds in the provided data
        joinedOn: '', // Assuming no mapping for joinedOn in the provided data
      },
      vehicleDetails: {
        type: '',
        number: '',
      },
      employee: {
        employeephotoUrl: '',
      },
    };
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  addHelperButtonClicked: boolean = false;
  createHelperUtil() {
    this.addHelperButtonClicked = true;

    this.helperUtility
      .storeFilesInCloud({
        kycDocumentBase64:
          this.compiledHelperFormData.personalDetails.kycDocument.url,
        kycDocumentFileDivisionType:
          this.compiledHelperFormData.personalDetails.kycDocument.type,
        kycDocumentFileName:
          this.compiledHelperFormData.personalDetails.kycDocument.filename,
        profilePic: this.compiledHelperFormData.employee.employeephotoUrl,
        helperFullName: this.compiledHelperFormData.personalDetails.fullName,
      })
      .subscribe({
        next: (res) => {
          this.compiledHelperFormData.employee.employeephotoUrl =
            res.uploaded?.profilePic ||
            `https://ui-avatars.com/api/?name=${this.compiledHelperFormData.personalDetails.fullName}&background=random&color=fff&rounded=true&bold=true&size=32`;
          this.compiledHelperFormData.personalDetails.kycDocument.url =
            res.uploaded?.kycDocument;

          let HELPER_MONGODB_ID: string = '';
          this.helperService
            .createHelper(this.compiledHelperFormData)
            .subscribe((res) => {
              // Navigate to the helper ID card page after successful creation
              HELPER_MONGODB_ID = res.data.helper._id;
              // You can use HELPER_MONGODB_ID as needed here
              this.helperService
                .getIdCard(HELPER_MONGODB_ID)
                .subscribe((res) => {
                  const identificationCardUrl = res.data.identificationCardUrl;
                  if (identificationCardUrl) {
                    window.open(identificationCardUrl, '_blank');
                  } else {
                    console.error('Identification Card URL not found');
                  }
                  this.router.navigate([
                    '/dashboard',
                    'staff-management',
                    'helpers',
                  ]);
                });
            });
        },
        error: () => {
          console.log('Error in Creating Helper');
        },
      });
  }

  ngOnInit() {}

  LangugagesList: string[] = ['English', 'Telugu', 'Hindi'];

  countryCallingCodes = [
    '1', // NANP (USA, Canada, many Caribbean territories)
    '20',
    '27',
    '210',
    '211',
    '212',
    '213',
    '216',
    '218',
    '220',
    '221',
    '222',
    '223',
    '224',
    '225',
    '226',
    '227',
    '228',
    '229',
    '230',
    '231',
    '232',
    '233',
    '234',
    '235',
    '236',
    '237',
    '238',
    '239',
    '240',
    '241',
    '242',
    '243',
    '244',
    '245',
    '246',
    '247',
    '248',
    '249',
    '250',
    '251',
    '252',
    '253',
    '254',
    '255',
    '256',
    '257',
    '258',
    '260',
    '261',
    '262',
    '263',
    '264',
    '265',
    '266',
    '267',
    '268',
    '269',
    '290',
    '291',
    '297',
    '298',
    '299',
    '30',
    '31',
    '32',
    '33',
    '34',
    '350',
    '351',
    '352',
    '353',
    '354',
    '355',
    '356',
    '357',
    '358',
    '359',
    '370',
    '371',
    '372',
    '373',
    '374',
    '375',
    '376',
    '377',
    '378',
    '379',
    '380',
    '381',
    '382',
    '383',
    '385',
    '386',
    '387',
    '389',
    '39', // Italy & Vatican share print
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '590',
    '591',
    '592',
    '593',
    '594',
    '595',
    '596',
    '597',
    '598',
    '599',
    '60',
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '670',
    '671',
    '672',
    '673',
    '674',
    '675',
    '676',
    '677',
    '678',
    '679',
    '680',
    '681',
    '682',
    '683',
    '685',
    '686',
    '687',
    '688',
    '689',
    '690',
    '691',
    '692',
    '7', // Russia & Kazakhstan share +7
    '81',
    '82',
    '84',
    '86',
    '850',
    '852',
    '853',
    '855',
    '856',
    '880',
    '886',
    '90',
    '91',
    '92',
    '93',
    '94',
    '95',
    '98',
    '212',
    '213',
    '216',
    '218',
    '220',
    '221',
    '222',
    '223',
    '224',
    '225',
    '226',
    '227',
    '228',
    '229',
    '230',
    '231',
    '232',
    '233',
    '234',
    '235',
    '236',
    '237',
    '238',
    '239',
    '240',
    '241',
    '242',
    '243',
    '244',
    '245',
    '246',
    '247',
    '248',
    '249',
    '250',
    '251',
    '252',
    '253',
    '254',
    '255',
    '256',
    '257',
    '258',
    '260',
    '261',
    '262',
    '263',
    '264',
    '265',
    '266',
    '267',
    '268',
    '269',
    '290',
    '291',
    '297',
    '298',
    '299',
    '380',
    '381',
    '385',
    '386',
    '420',
    '421',
    '423',
    '852',
    '853',
    '855',
    '856',
    '880',
    '886',
    '960',
    '961',
    '962',
    '963',
    '964',
    '965',
    '966',
    '967',
    '968',
    '970',
    '971',
    '972',
    '973',
    '974',
    '975',
    '976',
    '977',
    '992',
    '993',
    '994',
    '995',
    '996',
    '998',
  ];

  goToPreviousStageOfAddingHelper() {
    this.currentStageOfAddingHelper -= 1;
  }

  buttonClicked: number = 0;
  helperData: any;

  goToNextStageOfAddingHelper() {
    console.log(this.buttonClicked);
    if (this.currentStageOfAddingHelper === 1) {
      // call to the submit triggered
      this.buttonClicked++;
      return;
    }
    this.currentStageOfAddingHelper += 1;
  }

  handleStageOneHelperFormData(data: any) {
    this.helperData = data;

    this.compiledHelperFormData = this.helperUtility.compileFormData(
      data,
      false
    );

    this.helperPresentationData = {
      context: 'preview',
      data: this.compiledHelperFormData,
    };
    setTimeout(() => {
      this.currentStageOfAddingHelper += 1;
    });
  }
}

interface IHelperData {
  personalDetails: {
    kycDocument: {
      type: string;
      url: string;
      filesize: number;
      filename: string;
    };
    fullName: string;
    gender: string;
    languages: string[];
    phone: string;
    email: string;
    additionalDocuments: any[];
  };
  serviceDetails: {
    type: string;
    organization: string;
    assignedHouseholds: string[];
    joinedOn: string;
  };
  vehicleDetails: {
    type: string;
    number: string;
  };
  employee: {
    employeephotoUrl: string;
  };
}

interface Base64Meta {
  mimeType: string;
  base64: string;
  filename?: string;
}
