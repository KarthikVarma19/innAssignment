import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-helperform',
  standalone: true,
  imports: [NgSelectModule, FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './helperform.component.html',
  styleUrl: './helperform.component.scss',
})
export class HelperformComponent implements OnInit {
  heroForm: FormGroup;
  ages = [
    { value: '<18', label: 'Under 18' },
    { value: '18', label: '18' },
    { value: '>18', label: 'More than 18' },
  ];

  typeOfService = [
    { value: 'Maid', label: 'Maid' },
    { value: 'Cook', label: 'Cook' },
    { value: 'Nurse', label: 'Nurse' },
    { value: 'Driver', label: 'Driver' },
  ];
  organizationName = [
    { value: 'ASBL', label: 'ASBL' },
    { value: 'Springs Helpers', label: 'Springs Helpers' },
  ];

  people: any[] = [
    { value: 'all', label: 'Select All' },
    { value: 'English', label: 'English' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Hindi', label: 'Hindi' },
  ];
  selectedPeople = [];

  userInput: string = '';

  constructor(private fb: FormBuilder) {
    this.heroForm = this.fb.group({
      typeOfService: [null, Validators.required],
      organizationName: [null, Validators.required],
      fullName: ['', Validators.required],
      languages: [[], Validators.required],
      gender: [null, Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.email]],
      vehicleType: [null],
      vehicleNumber: ['', Validators.required],
      kycDocument: [null],
    });
  }

  ngOnInit() {
    this.heroForm = this.fb.group({
      age: [null, Validators.required],
    });
  }
  agesWithSelectAll = [{ value: 'all', label: 'Select All' }, ...this.ages];

  form = this.fb.group({
    age: this.fb.control<string[] | null>([]),
    typeOfService: this.fb.control<string[] | null>([]),
    organizationName: this.fb.control<string[] | null>([]),
  });

  onAgeChange(selectedValues: any[]) {
    const isSelectAll = selectedValues.includes('all');

    if (isSelectAll) {
      this.form.get('age')?.setValue(this.ages.map((a) => a.value));
    }
  }
}
