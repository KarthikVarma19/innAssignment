import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  FormControl,
  ReactiveFormsModule,
  Validators,
  Form,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { DialogboxComponent } from '../../../../shared/components/dialogbox-input/dialogbox-input.component';
import IkycDocumentDetails, {
  KycdocumentComponent,
} from '../kycdocument-dialogbox-input/kycdocument.component';
import { HelperFormService } from '../../services/helper-form.service';

@Component({
  selector: 'app-helperform',
  standalone: true,
  imports: [NgSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './helperform.component.html',
  styleUrl: './helperform.component.scss',
})
export class HelperformComponent implements OnInit {
  helperForm: FormGroup;
  typeOfServiceOptions = [
    { value: 'Maid', label: '🧹 Maid' },
    { value: 'Cook', label: '👨‍🍳 Cook' },
    { value: 'Nurse', label: '🧑‍⚕️ Nurse' },
    { value: 'Driver', label: '🚗 Driver' },
  ];
  organizationNameOptions = [
    { value: 'ASBL', label: 'ASBL' },
    { value: 'Springs Helpers', label: 'Springs Helpers' },
  ];
  languagesOptions: Array<{ label: string; value: string }> = [
    { value: 'English', label: 'English' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Hindi', label: 'Hindi' },
  ];
  vehicleTypeOptions: string[] = ['None', 'Auto', 'Car', 'Bike'];
  countryCallingCodeOptions: Array<{ label: string; value: number }> = [
    { label: '+1', value: 1 },
    { label: '+20', value: 20 },
    { label: '+27', value: 27 },
    { label: '+210', value: 210 },
    { label: '+211', value: 211 },
    { label: '+212', value: 212 },
    { label: '+213', value: 213 },
    { label: '+216', value: 216 },
    { label: '+218', value: 218 },
    { label: '+220', value: 220 },
    { label: '+221', value: 221 },
    { label: '+222', value: 222 },
    { label: '+223', value: 223 },
    { label: '+224', value: 224 },
    { label: '+225', value: 225 },
    { label: '+226', value: 226 },
    { label: '+227', value: 227 },
    { label: '+228', value: 228 },
    { label: '+229', value: 229 },
    { label: '+230', value: 230 },
    { label: '+231', value: 231 },
    { label: '+232', value: 232 },
    { label: '+233', value: 233 },
    { label: '+234', value: 234 },
    { label: '+235', value: 235 },
    { label: '+236', value: 236 },
    { label: '+237', value: 237 },
    { label: '+238', value: 238 },
    { label: '+239', value: 239 },
    { label: '+240', value: 240 },
    { label: '+241', value: 241 },
    { label: '+242', value: 242 },
    { label: '+243', value: 243 },
    { label: '+244', value: 244 },
    { label: '+245', value: 245 },
    { label: '+246', value: 246 },
    { label: '+247', value: 247 },
    { label: '+248', value: 248 },
    { label: '+249', value: 249 },
    { label: '+250', value: 250 },
    { label: '+251', value: 251 },
    { label: '+252', value: 252 },
    { label: '+253', value: 253 },
    { label: '+254', value: 254 },
    { label: '+255', value: 255 },
    { label: '+256', value: 256 },
    { label: '+257', value: 257 },
    { label: '+258', value: 258 },
    { label: '+260', value: 260 },
    { label: '+261', value: 261 },
    { label: '+262', value: 262 },
    { label: '+263', value: 263 },
    { label: '+264', value: 264 },
    { label: '+265', value: 265 },
    { label: '+266', value: 266 },
    { label: '+267', value: 267 },
    { label: '+268', value: 268 },
    { label: '+269', value: 269 },
    { label: '+290', value: 290 },
    { label: '+291', value: 291 },
    { label: '+297', value: 297 },
    { label: '+298', value: 298 },
    { label: '+299', value: 299 },
    { label: '+30', value: 30 },
    { label: '+31', value: 31 },
    { label: '+32', value: 32 },
    { label: '+33', value: 33 },
    { label: '+34', value: 34 },
    { label: '+350', value: 350 },
    { label: '+351', value: 351 },
    { label: '+352', value: 352 },
    { label: '+353', value: 353 },
    { label: '+354', value: 354 },
    { label: '+355', value: 355 },
    { label: '+356', value: 356 },
    { label: '+357', value: 357 },
    { label: '+358', value: 358 },
    { label: '+359', value: 359 },
    { label: '+370', value: 370 },
    { label: '+371', value: 371 },
    { label: '+372', value: 372 },
    { label: '+373', value: 373 },
    { label: '+374', value: 374 },
    { label: '+375', value: 375 },
    { label: '+376', value: 376 },
    { label: '+377', value: 377 },
    { label: '+378', value: 378 },
    { label: '+379', value: 379 },
    { label: '+380', value: 380 },
    { label: '+381', value: 381 },
    { label: '+382', value: 382 },
    { label: '+383', value: 383 },
    { label: '+385', value: 385 },
    { label: '+386', value: 386 },
    { label: '+387', value: 387 },
    { label: '+389', value: 389 },
    { label: '+39', value: 39 },
    { label: '+40', value: 40 },
    { label: '+41', value: 41 },
    { label: '+42', value: 42 },
    { label: '+43', value: 43 },
    { label: '+44', value: 44 },
    { label: '+45', value: 45 },
    { label: '+46', value: 46 },
    { label: '+47', value: 47 },
    { label: '+48', value: 48 },
    { label: '+49', value: 49 },
    { label: '+51', value: 51 },
    { label: '+52', value: 52 },
    { label: '+53', value: 53 },
    { label: '+54', value: 54 },
    { label: '+55', value: 55 },
    { label: '+56', value: 56 },
    { label: '+57', value: 57 },
    { label: '+58', value: 58 },
    { label: '+59', value: 59 },
    { label: '+590', value: 590 },
    { label: '+591', value: 591 },
    { label: '+592', value: 592 },
    { label: '+593', value: 593 },
    { label: '+594', value: 594 },
    { label: '+595', value: 595 },
    { label: '+596', value: 596 },
    { label: '+597', value: 597 },
    { label: '+598', value: 598 },
    { label: '+599', value: 599 },
    { label: '+60', value: 60 },
    { label: '+61', value: 61 },
    { label: '+62', value: 62 },
    { label: '+63', value: 63 },
    { label: '+64', value: 64 },
    { label: '+65', value: 65 },
    { label: '+66', value: 66 },
    { label: '+670', value: 670 },
    { label: '+671', value: 671 },
    { label: '+672', value: 672 },
    { label: '+673', value: 673 },
    { label: '+674', value: 674 },
    { label: '+675', value: 675 },
    { label: '+676', value: 676 },
    { label: '+677', value: 677 },
    { label: '+678', value: 678 },
    { label: '+679', value: 679 },
    { label: '+680', value: 680 },
    { label: '+681', value: 681 },
    { label: '+682', value: 682 },
    { label: '+683', value: 683 },
    { label: '+685', value: 685 },
    { label: '+686', value: 686 },
    { label: '+687', value: 687 },
    { label: '+688', value: 688 },
    { label: '+689', value: 689 },
    { label: '+690', value: 690 },
    { label: '+691', value: 691 },
    { label: '+692', value: 692 },
    { label: '+7', value: 7 },
    { label: '+81', value: 81 },
    { label: '+82', value: 82 },
    { label: '+84', value: 84 },
    { label: '+86', value: 86 },
    { label: '+850', value: 850 },
    { label: '+852', value: 852 },
    { label: '+853', value: 853 },
    { label: '+855', value: 855 },
    { label: '+856', value: 856 },
    { label: '+880', value: 880 },
    { label: '+886', value: 886 },
    { label: '+90', value: 90 },
    { label: '+91', value: 91 },
    { label: '+92', value: 92 },
    { label: '+93', value: 93 },
    { label: '+94', value: 94 },
    { label: '+95', value: 95 },
    { label: '+98', value: 98 },
  ];

  photoUploadedDetails: PhotoUploadedDetails;

  readonly PHOTO_LIMIT: number = 5242880;
  isEditMode = false;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private formService: HelperFormService,
    private zone: NgZone
  ) {
    this.helperForm = this.formService.createHelperForm();
    this.photoUploadedDetails = {
      fileName: '',
      url: '',
      size: 0,
      uploadedAt: new Date(),
      mimeType: '',
      base64: '',
    };
  }

  ngOnInit() {
    this.vehicleValidation();
    this.helperForm = this.formService.createHelperForm();
    if (this.helperBackendData) {
      this.formService.patchBackendData(
        this.helperForm,
        this.helperBackendData
      );
      this.setBackendDataProfilePicToBackend();
    } else {
      this.formService.patchHelperFormData(this.helperForm, this.helperData);
      setTimeout(() => {
        this.photoUploadedDetails.url = this.helperData?.profilePic;
      });
    }
    this.cdr.detectChanges(); // Force trigger change detection
  }

  @Output() helperFormDataStageOne: EventEmitter<any> = new EventEmitter();

  vehicleValidation() {
    const vehicleTypeControl = this.helperForm.get('vehicleType');
    if (vehicleTypeControl?.value === 'None') {
      this.helperForm.get('vehicleNumber')?.clearValidators();
      this.helperForm.get('vehicleNumber')?.updateValueAndValidity();
    }
  }

  get documentSizeInMB(): string {
    const size = Number(this.helperForm.get('kycDocumentSize')?.value);
    return (size / 1024 / 1024).toFixed(2);
  }

  profilePicUploaded(event: Event): void {
    console.log('photo uploaded');
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length === 1) {
      const file = target.files[0];
      if (file.size > this.PHOTO_LIMIT) {
        return;
      }
      this.photoUploadedDetails.size = file.size;
      this.photoUploadedDetails.fileName = file.name;
      this.photoUploadedDetails.mimeType = file.type;
      this.photoUploadedDetails.uploadedAt = new Date();

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.photoUploadedDetails.base64 = base64.split(',')[1];
        this.photoUploadedDetails.url = base64;
        this.helperForm.get('profilePic')?.setValue(base64);
        this.helperForm.get('profilePic')?.markAsDirty();
      };

      reader.onerror = (err) => console.error('FileReader error:', err);

      reader.readAsDataURL(file);
    }
  }

  @Input() helperData: any;
  @Input() buttonClicked: number = 0;

  @Input() helperBackendData: any;

  setBackendDataProfilePicToBackend() {
    setTimeout(() => {
      const employee = this.helperBackendData?.employee || {};
      this.photoUploadedDetails.url = employee?.employeephotoUrl || '';
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.vehicleValidation();
    this.formService.patchBackendData(this.helperForm, this.helperBackendData);
    this.setBackendDataProfilePicToBackend();
    if (
      changes['buttonClicked'] &&
      changes['buttonClicked'].currentValue !==
        changes['buttonClicked'].previousValue
    ) {
      if (this.buttonClicked > 0) {
        this.onSubmit();
      }
    }
  }

  onSubmit() {
    if (this.helperForm.invalid) {
      this.helperForm.markAllAsTouched();
      return;
    }
    if (
      this.formService.isFormChanged(this.helperForm, this.helperBackendData)
    ) {
      return;
    }

    this.setDefaultProfilePic();
    this.zone.run(() => {
      this.helperFormDataStageOne.emit(this.helperForm.value);
    });
  }

  // if user did not upload the helper image we will call the ui avatar api using full name and set to that while submitting
  setDefaultProfilePic(): void {
    const userName = this.helperForm.get('fullName')?.value;
    const userImageApiUrl = `https://ui-avatars.com/api/?name=${userName}&background=random&color=fff&rounded=true&bold=true&size=32`;
    const profilePicControl = this.helperForm.get('profilePic');
    if (profilePicControl && profilePicControl.value === '') {
      profilePicControl.setValue(userImageApiUrl);
    }
  }

  @ViewChild('dialogHost', { read: ViewContainerRef })
  dialogHost!: ViewContainerRef;

  openDialog() {
    // DESTROY if there are any before's view cihld componente ref
    this.dialogHost.clear();

    const dialogRef = this.dialogHost.createComponent(DialogboxComponent);
    dialogRef.setInput('componentType', KycdocumentComponent);
    dialogRef.setInput('componentHeading', 'Upload KYC Documents');

    dialogRef.instance.onClose.subscribe((data: IkycDocumentDetails) => {
      this.helperForm.get('kycDocumentType')?.setValue(data.documentType);
      this.helperForm.get('kycDocumentUrl')?.setValue(data.base64);
      this.helperForm.get('kycDocumentFileName')?.setValue(data.fileName);
      this.helperForm.get('kycDocumentSize')?.setValue(data.fileSize);
      this.dialogHost.clear();
    });
  }

  getEditHelperSaveButtonGetData() {
    return this.helperForm.value;
  }
}

interface PhotoUploadedDetails {
  fileName: string;
  url: string;
  size: number;
  uploadedAt: Date;
  mimeType: string;
  base64: string;
}
