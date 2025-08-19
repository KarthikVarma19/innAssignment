import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({ providedIn: 'root' })
export class HelperUtilityService {
  constructor(private helperService: HelperService) {}

  compileFormData(helperData: any, isEdit = false) {
    return {
      personalDetails: {
        kycDocument: {
          type: helperData.kycDocumentType || '',
          url: helperData.kycDocumentUrl || '',
          filesize: helperData.kycDocumentSize || 0,
          filename: helperData.kycDocumentFileName || '',
        },
        fullName: helperData.fullName || '',
        gender: helperData.gender || '',
        languages: helperData.languages || [],
        phone: `${helperData.countryCode}${helperData.phone}` || '',
        email: helperData.email || '',
        additionalDocuments: helperData.additionalDocuments || [],
      },
      serviceDetails: {
        type: helperData.typeOfService || '',
        organization: helperData.organizationName || '',
        assignedHouseholds: helperData.assignedHouseholds || [],
        joinedOn: isEdit
          ? helperData.joinedOn
          : new Date().toLocaleDateString('en-GB'),
      },
      vehicleDetails: {
        type: helperData.vehicleType || '',
        number: helperData.vehicleNumber || '',
      },
      employee: {
        employeephotoUrl: helperData.profilePic || '',
      },
    };
  }

  storeFilesInCloud(payload: {
    kycDocumentBase64: string;
    kycDocumentFileDivisionType: string;
    kycDocumentFileName: string;
    profilePic: string;
    helperFullName: string;
  }): Observable<any> {
    const formData = new FormData();

    const UNIQUE_NO = Date.now();
    const HELPER_NAME = payload.helperFullName
      .replaceAll(' ', '')
      .toUpperCase();

    if (!this.isValidHttpsUrl(payload.kycDocumentBase64)) {
      const KYC_TYPE = payload.kycDocumentFileDivisionType
        .replaceAll(' ', '')
        .toUpperCase();
      const KYC_EXT = '.' + payload.kycDocumentFileName.split('.').pop();
      const KYC_NAME = `${UNIQUE_NO}-${HELPER_NAME}-KYC-${KYC_TYPE}${KYC_EXT}`;
      const kycFile = this.base64ToFile(
        payload.kycDocumentBase64,
        KYC_NAME,
        payload.kycDocumentFileDivisionType
      );
      formData.append('kycDocument', kycFile);
    }

    if (!this.isValidHttpsUrl(payload.profilePic)) {
      const PROFILE_PIC_NAME = `${UNIQUE_NO}-${HELPER_NAME}-PROFILEPIC`;
      const profilePicType = this.guessImageMimeType(payload.profilePic);
      let profilePicExtension = '';
      if (profilePicType.startsWith('image/')) {
        profilePicExtension = '.' + profilePicType.split('/')[1];
      }
      const profilePicFullName = PROFILE_PIC_NAME + profilePicExtension;
      const profilePicFile = this.base64ToFile(
        payload.profilePic,
        profilePicFullName,
        profilePicType
      );
      formData.append('profilePic', profilePicFile);
    }

    return this.helperService.uploadMultipleFilesToCloud(formData);
  }

  // Utilities
  guessImageMimeType(base64: string): string {
    try {
      const actualBase64 = base64.includes(',') ? base64.split(',')[1] : base64;
      const binary = atob(actualBase64.slice(0, 30));
      if (binary.startsWith('\x89PNG')) return 'image/png';
      if (binary.startsWith('\xFF\xD8\xFF')) return 'image/jpeg';
      if (binary.startsWith('GIF87a') || binary.startsWith('GIF89a'))
        return 'image/gif';
      if (binary.startsWith('BM')) return 'image/bmp';
      if (binary.startsWith('RIFF') && binary.includes('WEBP'))
        return 'image/webp';
    } catch {}
    return 'application/stream';
  }

  isValidHttpsUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }

  base64ToFile(base64: string, filename: string, mimeType: string): File {
    const actualBase64 = base64.includes(',') ? base64.split(',')[1] : base64;
    const byteString = atob(actualBase64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], filename, { type: mimeType });
  }
}
