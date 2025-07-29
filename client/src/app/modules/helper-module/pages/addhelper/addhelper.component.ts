import { Component, OnInit } from '@angular/core';

import { NgIf } from '@angular/common';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatRadioModule } from '@angular/material/radio';

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
  ],
  templateUrl: './addhelper.component.html',
  styleUrl: './addhelper.component.scss',
})
export class AddhelperComponent implements OnInit {
  selectTypeOfServiceControl = new FormControl('');
  selectTypeOfServiceOptions: { fieldName: string; fieldIcon: string }[] = [
    { fieldName: 'Maid', fieldIcon: 'cleaning_services' },
    { fieldName: 'Cook', fieldIcon: 'restaurant' },
    { fieldName: 'Nurse', fieldIcon: 'medical_services' },
    { fieldName: 'Driver', fieldIcon: 'directions_car' },
  ];

  selectTypeOfServiceFilteredOptions: Observable<{ fieldName: string; fieldIcon: string }[]> | undefined;

  organizationNameControl = new FormControl('');
  organizationNameOptions: string[] = ['ASBL', 'Springs Helper'];
  organizationNameFilteredOptions: Observable<string[]> | undefined;

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

  toppings = new FormControl('');
  toppingList: string[] = ['English', 'Telugu', 'Hindi'];
}
