import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-kycdocument',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxExtendedPdfViewerModule,
  ],
  templateUrl: './kycdocument.component.html',
  styleUrl: './kycdocument.component.scss',
})
export class KycdocumentComponent implements OnInit {
  kycDocumentForm: FormGroup;
  pdfData: string;
  isDragging: boolean;
  kycDocumentViewClicked: boolean;
  @Input() name!: string;
  @Output() dataFromDialog: EventEmitter<IkycDocumentDetails>;
  documentTypeOptions = [
    { label: 'Aadhar Card', value: 'Aadhar Card' },
    { label: 'PAN Card', value: 'PAN Card' },
    { label: 'Passport', value: 'Passport' },
    { label: 'Voter ID', value: 'Voter ID' },
  ];
  kycDocumentDetails: IkycDocumentDetails;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
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
    this.dataFromDialog = new EventEmitter<IkycDocumentDetails>();
    this.isDragging = false;
    this.kycDocumentViewClicked = false;
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    this.isDragging = false;
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      this.kycDocumentDetails.fileSize = file.size;
      reader.onload = () => {
        const base64String = reader.result as string;
        this.kycDocumentForm.patchValue({ pdfFileUrl: base64String });
        this.pdfData = base64String.split(',')[1];
        this.kycDocumentDetails.base64 = base64String;
        this.kycDocumentDetails.fileName = file.name;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    } else {
      this.kycDocumentDetails.base64 = '';
      this.kycDocumentDetails.fileName = '';
      this.kycDocumentDetails.documentType = '';
      this.pdfData = '';
      this.clearThekycDocument();
      alert('Please upload a valid PDF file.');
    }
    input.value = '';
  }

  deleteUploadedkycDocument(): void {
    this.kycDocumentDetails.base64 = '';
    this.kycDocumentDetails.fileName = '';
    this.pdfData = '';
    this.kycDocumentForm.patchValue({ pdfFileUrl: '' });
  }

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
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    } else {
      this.kycDocumentDetails.base64 = '';
      this.kycDocumentDetails.fileName = '';
      this.pdfData = '';
      alert('Please upload a valid PDF file.');
    }
  }
}

export default interface IkycDocumentDetails {
  documentType: string;
  fileName: string;
  base64: string;
  fileSize: number;
}
