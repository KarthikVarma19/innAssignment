import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@Component({
  selector: 'app-kycdocument',
  standalone: true,
  imports: [
    CommonModule,
    NgSelectModule,
    NgxExtendedPdfViewerModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './kycdocument.component.html',
  styleUrl: './kycdocument.component.scss',
})
export class KycdocumentComponent implements OnInit {
  isDragging = false;
  kycDocumentViewClicked: boolean = false;
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.kycDocumentForm.patchValue({ pdfFileUrl: base64String });
        this.pdfData = base64String.split(',')[1];
        this.kycDocumentDetails.base64 = base64String;
        this.kycDocumentDetails.fileName = file.name;
      };
      reader.readAsDataURL(file); // Converts PDF to base64 data URL
    } else {
      this.kycDocumentDetails.base64 = '';
      this.kycDocumentDetails.fileName = '';
      this.pdfData = '';
      alert('Please upload a valid PDF file.');
    }
  }

  @Input() name!: string;

  kycDocumentForm: FormGroup;

  pdfData: string;

  documentTypeOptions = [
    { label: 'Aadhar Card', value: 'Aadhar Card' },
    { label: 'PAN Card', value: 'PAN Card' },
    { label: 'Passport', value: 'Passport' },
    { label: 'Voter ID', value: 'Voter ID' },
  ];

  kycDocumentDetails: IkycDocumentDetails;

  constructor(private fb: FormBuilder) {
    this.kycDocumentForm = this.fb.group({
      documentType: ['', Validators.required],
      pdfFileUrl: ['', Validators.required],
    });
    this.kycDocumentDetails = {
      documentType: '',
      fileName: '',
      base64: '',
      fileSize: 0,
    };
    this.pdfData = '';
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.isDragging = false;
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      this.kycDocumentDetails.fileSize = file.size;
      (reader.onload = () => {
          const base64String = reader.result as string;
          this.kycDocumentForm.patchValue({ pdfFileUrl: base64String });
          this.pdfData = base64String.split(',')[1];
          this.kycDocumentDetails.base64 = base64String;
          this.kycDocumentDetails.fileName = file.name;
        });
      reader.readAsDataURL(file);
    } else {
      this.kycDocumentDetails.base64 = '';
      this.kycDocumentDetails.fileName = '';
      this.kycDocumentDetails.documentType = '';
      this.pdfData = '';
      alert('Please upload a valid PDF file.');
    }
  }
  deleteUploadedkycDocument(): void {
    this.kycDocumentDetails.base64 = '';
    this.kycDocumentDetails.fileName = '';
    this.pdfData = '';
    this.kycDocumentForm.patchValue({ pdfFileUrl: '' });
  }

  @Output() dataFromDialog = new EventEmitter<IkycDocumentDetails>();

  saveThekycDocument(event: Event) {
    event.preventDefault();
    if (this.kycDocumentForm.invalid) {
      this.kycDocumentForm.markAllAsTouched();
      return;
    }
    this.kycDocumentDetails.documentType =
    this.kycDocumentForm.get('documentType')?.value;
    this.dataFromDialog.emit(this.kycDocumentDetails);
  }
  clearThekycDocument(): void {
    this.kycDocumentForm.patchValue({ pdfFileUrl: '', documentType: '' });
    this.deleteUploadedkycDocument();
  }
}

export default interface IkycDocumentDetails {
  documentType: string;
  fileName: string;
  base64: string;
  fileSize: number;
}
