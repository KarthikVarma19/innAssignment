import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class HelperFormService {
  readonly PHOTO_LIMIT = 5242880; // 5MB

  constructor(private fb: FormBuilder) {}

  /** Create empty form for Add mode */
  /* helperForm = new FormGroup({
    profilePic: new FormControl(''),
    typeOfService: new FormControl('', Validators.required),
    organizationName: new FormControl('', Validators.required),
    fullName: new FormControl(
      '',
      Validators.compose([
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z ]*'),
      ])
    ),
    languages: new FormControl(
      [],
      Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(3),
      ])
    ),
    gender: new FormControl('', Validators.required),
    countryCode: new FormControl(91, Validators.required),
    phone: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(10),
        Validators.pattern('^[0-9]{10,15}$'),
      ])
    ),
    email: new FormControl(
      '',
      Validators.compose([Validators.email, Validators.required])
    ),
    vehicleType: new FormControl('None', Validators.required),
    vehicleNumber: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}'),
      ])
    ),
    kycDocumentType: new FormControl('', Validators.required),
    kycDocumentUrl: new FormControl('', Validators.required),
    kycDocumentFileName: new FormControl('', Validators.required),
    kycDocumentSize: new FormControl(0, Validators.required),
  });
  */

  createHelperForm(): FormGroup {
    return this.fb.group({
      profilePic: [''],
      typeOfService: ['', Validators.required],
      organizationName: ['', Validators.required],
      fullName: [
        '',
        [Validators.minLength(4), Validators.pattern('[a-zA-Z ]*')],
      ],
      languages: [
        [],
        [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      ],
      gender: ['', Validators.required],
      countryCode: [91, Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(10),
          Validators.pattern('^[0-9]{10,15}$'),
        ],
      ],
      email: ['', [Validators.email, Validators.required]],
      vehicleType: ['None', Validators.required],
      vehicleNumber: ['', [Validators.required, Validators.minLength(5)]],
      kycDocumentType: ['', Validators.required],
      kycDocumentUrl: ['', Validators.required],
      kycDocumentFileName: ['', Validators.required],
      kycDocumentSize: [0, Validators.required],
    });
  }

  extractCountryCodeAndLocalNumber(phoneNumber: string): {
    countryCode: number;
    localNumber: string;
  } {
    // Returns both country code and the rest of the phone number
    if (!phoneNumber) {
      return { countryCode: 91, localNumber: '' };
    }
    const countryCodes = [
      212, 213, 216, 218, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230,
      231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245,
      246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 260, 261,
      262, 263, 264, 265, 266, 267, 268, 269, 290, 291, 297, 298, 299, 350, 351,
      352, 353, 354, 355, 356, 357, 358, 359, 370, 371, 372, 373, 374, 375, 376,
      377, 378, 379, 380, 381, 382, 383, 385, 386, 387, 389, 590, 591, 592, 593,
      594, 595, 596, 597, 598, 599, 670, 671, 672, 673, 674, 675, 676, 677, 678,
      679, 680, 681, 682, 683, 685, 686, 687, 688, 689, 690, 691, 692, 850, 852,
      853, 855, 856, 880, 886, 1, 20, 27, 30, 31, 32, 33, 34, 39, 40, 41, 42,
      43, 44, 45, 46, 47, 48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
      62, 63, 64, 65, 66, 7, 81, 82, 84, 86, 90, 91, 92, 93, 94, 95, 98,
    ].sort((a, b) => b.toString().length - a.toString().length);

    let countryCode = 91;
    let restPhone = phoneNumber;

    for (const code of countryCodes) {
      const codeStr = code.toString();
      if (phoneNumber.startsWith(codeStr)) {
        countryCode = Number(codeStr);
        restPhone = phoneNumber.substring(codeStr.length);
        break;
      }
    }
    return { countryCode, localNumber: restPhone };
  }

  /** Patch data into form for Edit mode */
  patchBackendData(form: FormGroup, backendData: any) {
    if (!backendData) return;

    const personal = backendData.personalDetails || {};
    const service = backendData.serviceDetails || {};
    const vehicle = backendData.vehicleDetails || {};
    const kyc = personal.kycDocument || {};
    const employee = backendData.employee || {};

    const phoneNumber = personal.phone || '';

    let { countryCode, localNumber } =
      this.extractCountryCodeAndLocalNumber(phoneNumber);

    form.patchValue({
      profilePic: employee.employeephotoUrl || '',
      typeOfService: service.type || '',
      organizationName: service.organization || '',
      fullName: personal.fullName || '',
      languages: personal.languages || [],
      gender: personal.gender || '',
      countryCode,
      phone: localNumber,
      email: personal.email || '',
      vehicleType: vehicle.type || '',
      vehicleNumber: vehicle.number || '',
      kycDocumentType: kyc.type || '',
      kycDocumentUrl: kyc.url || '',
      kycDocumentFileName: kyc.filename || '',
      kycDocumentSize: kyc.filesize || 0,
    });
  }
  /**
   * Checks if the form has any changes compared to the initial backend data.
   * @param form The form group to check.
   * @param backendData The initial backend data used to patch the form.
   * @returns boolean indicating if the form is dirty (has changes).
   */
  isFormChanged(form: FormGroup, backendData: any): boolean {
    if (!backendData) return false;

    const personal = backendData.personalDetails || {};
    const service = backendData.serviceDetails || {};
    const vehicle = backendData.vehicleDetails || {};
    const kyc = personal.kycDocument || {};
    const employee = backendData.employee || {};

    const phoneNumber = personal.phone || '';

    let { countryCode, localNumber } =
      this.extractCountryCodeAndLocalNumber(phoneNumber);

    const initialValues: any = {
      profilePic: employee.employeephotoUrl || '',
      typeOfService: service.type || '',
      organizationName: service.organization || '',
      fullName: personal.fullName || '',
      languages: personal.languages || [],
      gender: personal.gender || '',
      countryCode,
      phone: localNumber,
      email: personal.email || '',
      vehicleType: vehicle.type || '',
      vehicleNumber: vehicle.number || '',
      kycDocumentType: kyc.type || '',
      kycDocumentUrl: kyc.url || '',
      kycDocumentFileName: kyc.filename || '',
      kycDocumentSize: kyc.filesize || 0,
    };

    // Compare each form value with the initial value
    for (const key of Object.keys(initialValues)) {
      const formValue = form.get(key)?.value;
      const initialValue = initialValues[key];

      // For arrays, compare as strings
      if (Array.isArray(initialValue)) {
        if (JSON.stringify(formValue) !== JSON.stringify(initialValue)) {
          return true;
        }
      } else {
        if (formValue !== initialValue) {
          return true;
        }
      }
    }
    return false;
  }

  /** Auto-generate profile picture if missing */
  setDefaultProfilePic(form: FormGroup) {
    const userName = form.get('fullName')?.value || '';
    if (!form.get('profilePic')?.value && userName) {
      const url = `https://ui-avatars.com/api/?name=${userName}&background=random&color=fff&rounded=true&bold=true&size=32`;
      form.get('profilePic')?.setValue(url);
    }
  }

  patchHelperFormData(helperForm: FormGroup, stageoneHelperData: any) {
    setTimeout(() => {
      helperForm.patchValue({
        profilePic: stageoneHelperData?.profilePic || '',
        typeOfService: stageoneHelperData?.typeOfService || '',
        organizationName: stageoneHelperData?.organizationName || '',
        fullName: stageoneHelperData?.fullName || '',
        languages: stageoneHelperData?.languages || [],
        gender: stageoneHelperData?.gender || '',
        countryCode: stageoneHelperData?.countryCode || 91,
        phone: stageoneHelperData?.phone || '',
        email: stageoneHelperData?.email || '',
        vehicleType: stageoneHelperData?.vehicleType || 'None',
        vehicleNumber: stageoneHelperData?.vehicleNumber || '',
        kycDocumentType: stageoneHelperData?.kycDocumentType || '',
        kycDocumentUrl: stageoneHelperData?.kycDocumentUrl || '',
        kycDocumentFileName: stageoneHelperData?.kycDocumentFileName || '',
        kycDocumentSize: stageoneHelperData?.kycDocumentSize || 0,
      });
    });
  }
}
