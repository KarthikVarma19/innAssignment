import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelperdataComponent } from '../../components/helperbody/helperdata/helperdata.component';
import { RouterModule } from '@angular/router';
import { HelperService } from '../../services/helper.services';
import { HelperformComponent } from '../../components/helperform/helperform.component';
import { ChevronsLeftRightEllipsis } from 'lucide-angular';

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
    private cdr: ChangeDetectorRef
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
    this.cdr.detectChanges(); // Manually trigger a safe second check
  }

  createHelper() {
    // first upload the image url and kycdocument url
    const result = this.storeTheImagesAndDocumentsInTheCloud({
      kycDocumentBase64:
        this.compiledHelperFormData.personalDetails.kycDocument.url,
      kycDocumentFileType:
        this.compiledHelperFormData.personalDetails.kycDocument.type,
      kycDocumentFileName:
        this.compiledHelperFormData.personalDetails.kycDocument.filename,
      profilePic: this.compiledHelperFormData.employee.employeephotoUrl,
      profilePicName: this.compiledHelperFormData.personalDetails.fullName,
    });

    result.subscribe((res) => {
      this.compiledHelperFormData.employee.employeephotoUrl = res.uploaded.profilePic;
      this.compiledHelperFormData.personalDetails.kycDocument.url = res.uploaded.kycDocument;

      
      this.helperService.createHelper(this.compiledHelperFormData).subscribe((res) => console.log(res));
      
    });
    // this.helperService
    //   .createHelper(this.compiledHelperFormData)
    //   .subscribe((response) => {
    //     console.log(response);
    //   });
    // this.compiledHelperFormData.employee.employeephotoUrl 
  }

  storeTheImagesAndDocumentsInTheCloud({
    kycDocumentBase64,
    kycDocumentFileType,
    kycDocumentFileName,
    profilePic,
    profilePicName,
  }: {
    kycDocumentBase64: string;
    kycDocumentFileType: string;
    kycDocumentFileName: string;
    profilePic: string;
    profilePicName: string;
  }) {
    const formData = new FormData();

    // KYC Document (assuming PDF)
    const kycFile = this.base64ToFile(
      kycDocumentBase64,
      kycDocumentFileName,
      kycDocumentFileType
    );
    formData.append('kycDocument', kycFile);

    // Profile Pic (assuming image)
    if (!this.isValidHttpsUrl(profilePic)) {
      const profilePicType = this.guessMimeType(profilePic);
      const profilePicFile = this.base64ToFile(
        profilePic,
        profilePicName,
        profilePicType
      );
      formData.append('profilePic', profilePicFile);
    }

    return this.helperService.uploadMultipleFilesToCloud(formData);
  }

  guessMimeType(base64: string): string {
    try {
      const actualBase64 = base64.includes(',') ? base64.split(',')[1] : base64;
      const binary = atob(actualBase64.slice(0, 30)); // Decode slightly longer chunk
      if (binary.startsWith('\x89PNG')) return 'image/png';
      if (binary.startsWith('\xFF\xD8\xFF')) return 'image/jpeg';
      if (binary.startsWith('GIF87a') || binary.startsWith('GIF89a'))
        return 'image/gif';
      if (binary.startsWith('BM')) return 'image/bmp';
      if (binary.startsWith('RIFF') && binary.includes('WEBP'))
        return 'image/webp';
    } catch (err) {
      console.error('Invalid base64 for MIME guessing:', err);
    }
    return 'application/octet-stream'; // Default fallback
  }

  parseBase64DataUrl(dataUrl: string, defaultFilename = 'file'): Base64Meta {
    const matches = dataUrl.match(/^data:(.+);base64,(.*)$/);

    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 data URL');
    }

    const mimeType = matches[1];
    const base64 = matches[2];
    const extension = mimeType.split('/')[1];
    const filename = `${defaultFilename}.${extension}`;

    return { mimeType, base64, filename };
  }

  isValidHttpsUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:';
    } catch (err) {
      return false; // Invalid URL
    }
  }

  base64ToFile(base64: string, filename: string, mimeType: string): File {
    let actualBase64: string;

    if (base64.includes(',')) {
      // Data URL format: "data:image/png;base64,..."
      actualBase64 = base64.split(',')[1];
    } else {
      // Raw base64 (no prefix)
      actualBase64 = base64;
    }

    try {
      const byteString = atob(actualBase64);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      if (!filename) {
        filename = 'randomfile_' + Math.random().toFixed(10);
      }

      return new File([ab], filename, { type: mimeType });
    } catch (err) {
      console.error('Error decoding base64:', err);
      throw new Error('Invalid base64 string');
    }
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
    if (this.currentStageOfAddingHelper === 1) {
      // call to the submit triggered
      this.buttonClicked++;
      return;
    }
    this.currentStageOfAddingHelper += 1;
  }

  handleStageOneHelperFormData(data: any) {
    this.helperData = data;
    this.compiledHelperFormData = {
      personalDetails: {
        kycDocument: {
          type: this.helperData.kycDocumentType || '',
          url: this.helperData.kycDocumentUrl || '',
          filesize: this.helperData.kycDocumentSize || 0,
          filename: this.helperData.kycDocumentFileName || '',
        },
        fullName: this.helperData.fullName || '',
        gender: this.helperData.gender || '',
        languages: this.helperData.languages || [],
        phone: `${this.helperData.countryCode}${this.helperData.phone}` || '',
        email: this.helperData.email || '',
        additionalDocuments: [], // Assuming no mapping for additionalDocuments in the provided data
      },
      serviceDetails: {
        type: this.helperData.typeOfService || '',
        organization: this.helperData.organizationName || '',
        assignedHouseholds: [], // Assuming no mapping for assignedHouseholds in the provided data
        joinedOn: new Date().toLocaleDateString('en-GB'), // Using the current date as a placeholder
      },
      vehicleDetails: {
        type: this.helperData.vehicleType || '',
        number: this.helperData.vehicleNumber || '',
      },
      employee: {
        employeephotoUrl: this.helperData.profilePic || '',
      },
    };
    console.log(this.compiledHelperFormData);
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