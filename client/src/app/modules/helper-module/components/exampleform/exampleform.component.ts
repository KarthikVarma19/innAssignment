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
  selector: 'app-exampleform',
  standalone: true,
  imports: [NgSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './exampleform.component.html',
  styleUrls: ['./exampleform.component.scss'],
})
export class ExampleformComponent implements OnInit {
  heroForm: FormGroup;
  ages = [
    { value: '<18', label: 'Under 18' },
    { value: '18', label: '18' },
    { value: '>18', label: 'More than 18' },
  ];

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
}
