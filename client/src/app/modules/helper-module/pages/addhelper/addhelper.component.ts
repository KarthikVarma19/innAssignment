import { Component, OnInit } from '@angular/core';

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
  goToNextStageOfAddingHelper() {
    this.currentStageOfAddingHelper += 1;
  }
}
