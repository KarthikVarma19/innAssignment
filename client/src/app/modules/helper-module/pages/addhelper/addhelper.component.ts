import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule, NgIf } from '@angular/common';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatRadioModule } from '@angular/material/radio';
import { HelperbodyComponent } from '../../components/helperbody/helperbody.component';
import { HelperdataComponent } from '../../components/helperbody/helperdata/helperdata.component';
import { RouterModule } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import { HelperService } from '../../services/helper.services';
import { HelperformComponent } from '../../components/helperform/helperform.component';

@Component({
  selector: 'app-addhelper',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
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

  selectTypeOfServiceControl = new FormControl('');
  selectTypeOfServiceOptions: { fieldName: string; fieldIcon: string }[] = [
    { fieldName: 'Maid', fieldIcon: 'cleaning_services' },
    { fieldName: 'Cook', fieldIcon: 'restaurant' },
    { fieldName: 'Nurse', fieldIcon: 'medical_services' },
    { fieldName: 'Driver', fieldIcon: 'directions_car' },
  ];
  selectTypeOfServiceFilteredOptions:
    | Observable<{ fieldName: string; fieldIcon: string }[]>
    | undefined;

  organizationNameControl = new FormControl('');
  organizationNameOptions: string[] = ['ASBL', 'Springs Helper'];
  organizationNameFilteredOptions: Observable<string[]> | undefined;

  vehicleTypeControl = new FormControl('');
  vehicleTypeOptions: string[] = ['None', 'Auto', 'Car', 'Bike'];
  vehicleTypeFilteredOptions: Observable<string[]> | undefined;

  constructor(
    private helperService: HelperService,
    private cdr: ChangeDetectorRef
  ) {
    this.createHelper();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges(); // Manually trigger a safe second check
  }
  createHelper() {
    const data = [
      {
        personalDetails: {
          fullName: 'Riya Sharma',
          gender: 'Female',
          languages: ['Hindi', 'English'],
          phone: '9876543210',
          email: 'riya.sharma@example.com',
          kycDocument: {
            type: 'Aadhar Card',
            url: 'https://kyc.example.com/riya_aadhar.pdf',
          },
          additionalDocuments: [],
        },
        serviceDetails: {
          type: 'Nurse',
          organization: 'CareWell Hospital',
          joinedOn: '2023-09-01',
          assignedHouseholds: ['HH-1001', 'HH-1012', 'HH-1023'],
        },
        vehicleDetails: { type: 'Bike', number: 'MH12AB1234' },
        employeeDetails: {
          employeeId: 'EMP-101',
          employeeDepartment: 'Nursing',
          employeePhotoUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
          identificationCardUrl: 'https://cdn.example.com/idcards/emp101.png',
        },
      },
      {
        personalDetails: {
          fullName: 'Ananya Verma',
          gender: 'Female',
          languages: ['Marathi', 'English'],
          phone: '9876543221',
          email: 'ananya.verma@example.com',
          kycDocument: {
            type: 'Pan Card',
            url: 'https://kyc.example.com/ananya_pan.pdf',
          },
          additionalDocuments: [],
        },
        serviceDetails: {
          type: 'Maid',
          organization: 'HappyHomes Services',
          joinedOn: '2024-02-10',
          assignedHouseholds: ['HH-1100', 'HH-1105'],
        },
        vehicleDetails: { type: 'None' },
        employeeDetails: {
          employeeId: 'EMP-102',
          employeeDepartment: 'Housekeeping',
          employeePhotoUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
          identificationCardUrl: 'https://cdn.example.com/idcards/emp102.png',
        },
      },
      {
        personalDetails: {
          fullName: 'Kavya Patel',
          gender: 'Female',
          languages: ['Gujarati', 'English'],
          phone: '9876543232',
          email: 'kavya.patel@example.com',
          kycDocument: {
            type: 'Voter Id',
            url: 'https://kyc.example.com/kavya_voter.pdf',
          },
          additionalDocuments: [],
        },
        serviceDetails: {
          type: 'Cook',
          organization: 'CityCare',
          joinedOn: '2023-11-07',
          assignedHouseholds: ['HH-1230', 'HH-1231', 'HH-1232'],
        },
        vehicleDetails: { type: 'None' },
        employeeDetails: {
          employeeId: 'EMP-103',
          employeeDepartment: 'Culinary',
          employeePhotoUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
          identificationCardUrl: 'https://cdn.example.com/idcards/emp103.png',
        },
      },
      {
        personalDetails: {
          fullName: 'Sanya Iyer',
          gender: 'Female',
          languages: ['Tamil', 'English'],
          phone: '9876543243',
          email: 'sanya.iyer@example.com',
          kycDocument: {
            type: 'Passport',
            url: 'https://kyc.example.com/sanya_passport.pdf',
          },
          additionalDocuments: [],
        },
        serviceDetails: {
          type: 'Driver',
          organization: 'Urban Helpers',
          joinedOn: '2024-01-15',
          assignedHouseholds: ['HH-1300', 'HH-1302', 'HH-1305', 'HH-1307'],
        },
        vehicleDetails: { type: 'Car', number: 'KA05JJ6789' },
        employeeDetails: {
          employeeId: 'EMP-104',
          employeeDepartment: 'Transport',
          employeePhotoUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
          identificationCardUrl: 'https://cdn.example.com/idcards/emp104.png',
        },
      },
      {
        personalDetails: {
          fullName: 'Meera Reddy',
          gender: 'Female',
          languages: ['Telugu', 'English'],
          phone: '9876543254',
          email: 'meera.reddy@example.com',
          kycDocument: {
            type: 'Aadhar Card',
            url: 'https://kyc.example.com/meera_aadhar.pdf',
          },
          additionalDocuments: [],
        },
        serviceDetails: {
          type: 'Electrician',
          organization: 'CareWell Hospital',
          joinedOn: '2023-10-20',
          assignedHouseholds: [
            'HH-1400',
            'HH-1402',
            'HH-1403',
            'HH-1404',
            'HH-1405',
          ],
        },
        vehicleDetails: { type: 'Auto', number: 'MH01CD2345' },
        employeeDetails: {
          employeeId: 'EMP-105',
          employeeDepartment: 'Maintenance',
          employeePhotoUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
          identificationCardUrl: 'https://cdn.example.com/idcards/emp105.png',
        },
      },
      {
        personalDetails: {
          fullName: 'Divya Joshi',
          gender: 'Female',
          languages: ['Hindi', 'English'],
          phone: '9876543265',
          email: 'divya.joshi@example.com',
          kycDocument: {
            type: 'Pan Card',
            url: 'https://kyc.example.com/divya_pan.pdf',
          },
          additionalDocuments: [],
        },
        serviceDetails: {
          type: 'Cook',
          organization: 'HappyHomes Services',
          joinedOn: '2024-03-11',
          assignedHouseholds: ['HH-1501', 'HH-1502'],
        },
        vehicleDetails: { type: 'None' },
        employeeDetails: {
          employeeId: 'EMP-106',
          employeeDepartment: 'Culinary',
          employeePhotoUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
          identificationCardUrl: 'https://cdn.example.com/idcards/emp106.png',
        },
      },
      {
        personalDetails: {
          fullName: 'Neha Kulkarni',
          gender: 'Female',
          languages: ['Marathi', 'English'],
          phone: '9876543276',
          email: 'neha.kulkarni@example.com',
          kycDocument: {
            type: 'Voter Id',
            url: 'https://kyc.example.com/neha_voter.pdf',
          },
          additionalDocuments: [],
        },
        serviceDetails: {
          type: 'Plumber',
          organization: 'CityCare',
          joinedOn: '2023-12-05',
          assignedHouseholds: ['HH-1600', 'HH-1601', 'HH-1602', 'HH-1603'],
        },
        vehicleDetails: { type: 'Auto', number: 'MH02EF6789' },
        employeeDetails: {
          employeeId: 'EMP-107',
          employeeDepartment: 'Maintenance',
          employeePhotoUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
          identificationCardUrl: 'https://cdn.example.com/idcards/emp107.png',
        },
      },
      {
        personalDetails: {
          fullName: 'Ishita Singh',
          gender: 'Female',
          languages: ['Punjabi', 'English'],
          phone: '9876543287',
          email: 'ishita.singh@example.com',
          kycDocument: {
            type: 'Passport',
            url: 'https://kyc.example.com/ishita_passport.pdf',
          },
          additionalDocuments: [],
        },
        serviceDetails: {
          type: 'Nurse',
          organization: 'Urban Helpers',
          joinedOn: '2024-04-22',
          assignedHouseholds: ['HH-1700', 'HH-1701', 'HH-1702'],
        },
        vehicleDetails: { type: 'Bike', number: 'MH03GH1234' },
        employeeDetails: {
          employeeId: 'EMP-108',
          employeeDepartment: 'Nursing',
          employeePhotoUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
          identificationCardUrl: 'https://cdn.example.com/idcards/emp108.png',
        },
      },
      {
        personalDetails: {
          fullName: 'Tanya Mehta',
          gender: 'Female',
          languages: ['Gujarati', 'English'],
          phone: '9876543298',
          email: 'tanya.mehta@example.com',
          kycDocument: {
            type: 'Aadhar Card',
            url: 'https://kyc.example.com/tanya_aadhar.pdf',
          },
          additionalDocuments: [],
        },
        serviceDetails: {
          type: 'Maid',
          organization: 'CareWell Hospital',
          joinedOn: '2023-08-30',
          assignedHouseholds: ['HH-1800'],
        },
        vehicleDetails: { type: 'None' },
        employeeDetails: {
          employeeId: 'EMP-109',
          employeeDepartment: 'Housekeeping',
          employeePhotoUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
          identificationCardUrl: 'https://cdn.example.com/idcards/emp109.png',
        },
      },
      {
        personalDetails: {
          fullName: 'Pooja Thakur',
          gender: 'Female',
          languages: ['Hindi', 'English'],
          phone: '9876543309',
          email: 'pooja.thakur@example.com',
          kycDocument: {
            type: 'Pan Card',
            url: 'https://kyc.example.com/pooja_pan.pdf',
          },
          additionalDocuments: [],
        },
        serviceDetails: {
          type: 'Electrician',
          organization: 'CityCare',
          joinedOn: '2024-05-05',
          assignedHouseholds: [
            'HH-1900',
            'HH-1901',
            'HH-1902',
            'HH-1903',
            'HH-1904',
            'HH-1905',
          ],
        },
        vehicleDetails: { type: 'Car', number: 'MH04IJ6789' },
        employeeDetails: {
          employeeId: 'EMP-110',
          employeeDepartment: 'Maintenance',
          employeePhotoUrl: 'https://randomuser.me/api/portraits/women/13.jpg',
          identificationCardUrl: 'https://cdn.example.com/idcards/emp110.png',
        },
      },
    ];

    data.map((eachHelper) => {
      this.helperService.createHelper(eachHelper).subscribe((res) => {
        // console.log(res);
      });
    });
  }

  ngOnInit() {
    this.selectTypeOfServiceFilteredOptions =
      this.selectTypeOfServiceControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.filterForTypeOfService(value || ''))
      );

    this.organizationNameFilteredOptions =
      this.organizationNameControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.filterForOrganizationName(value || ''))
      );

    this.vehicleTypeFilteredOptions = this.vehicleTypeControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterForVehicleType(value || ''))
    );
  }

  private filterForTypeOfService(
    value: string
  ): { fieldName: string; fieldIcon: string }[] {
    const filterValue = value.toLowerCase();

    return this.selectTypeOfServiceOptions.filter((option) =>
      option.fieldName.toLowerCase().includes(filterValue)
    );
  }
  private filterForOrganizationName(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.organizationNameOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  private filterForVehicleType(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.vehicleTypeOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  language = new FormControl('');
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
    if (this.currentStageOfAddingHelper === 1) {
      // call to the submit triggered
      this.buttonClicked++;
      return;
    }
    this.currentStageOfAddingHelper += 1;
  }
  handleStageOneHelperFormData(data: any) {
    this.helperData = data;
    setTimeout(() => {
      this.currentStageOfAddingHelper += 1;
    });
  }
}
