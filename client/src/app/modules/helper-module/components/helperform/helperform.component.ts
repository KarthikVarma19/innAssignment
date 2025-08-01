import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-helperform',
  standalone: true,
  imports: [NgSelectModule, FormsModule, ReactiveFormsModule],
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
  userInput: string = '';

  constructor(private fb: FormBuilder) {
    this.heroForm = this.fb.group({
      age: [null],
    });
  }

  ngOnInit() {
    this.heroForm = this.fb.group({
      age: [null, Validators.required],
    });
  }
  agesWithSelectAll = [{ value: 'all', label: 'Select All' }, ...this.ages];

  form = this.fb.group({
    age: this.fb.control<string[] | null>([]), // Explicitly define the type as string[] or null
  });

  onAgeChange(selectedValues: any[]) {
    const isSelectAll = selectedValues.includes('all');

    if (isSelectAll) {
      // Remove 'all' and replace with actual values
      this.form.get('age')?.setValue(this.ages.map((a) => a.value));
    }
  }
}
