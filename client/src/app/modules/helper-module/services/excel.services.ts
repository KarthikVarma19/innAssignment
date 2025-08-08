import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  downloadExcel(data: any[], fileName: string = 'helpers_data.xlsx'): void {
    const flattenedDataIntoJSON = flattenHelperData(data);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(flattenedDataIntoJSON);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout: ArrayBuffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  }
}

interface KycDoc {
  type?: string;
  url?: string;
  filename?: string;
  filesize?: number;
}

function formatAdditionalDocs(docs: KycDoc[]): string {
  if (!docs || docs.length === 0) return '';
  return docs
    .map((doc) => `${doc.type || 'Unknown'} (${doc.url || 'No URL'})`)
    .join(', ');
}

function flattenHelperData(data: any[]): any[] {
  return data.map((item) => ({
    //_id: item._id || '',
    employeeId: item.employee?.employeeId || '',
    Full_Name: item.personalDetails?.fullName || '',
    gender: item.personalDetails?.gender || '',
    languages: (item.personalDetails?.languages || []).join(', '),
    Phone_Number: item.personalDetails?.phone || '',
    Email_Address: item.personalDetails?.email || '',
    KYC_Document_Type: item.personalDetails?.kycDocument?.type || '',
    // KYC_Document_Filename: item.personalDetails?.kycDocument?.filename || '',
    KYC_Document_URL: item.personalDetails?.kycDocument?.url || '',
    // KYC_Document_Size_Bytes: item.personalDetails?.kycDocument?.filesize || '',
    Additional_Documents: formatAdditionalDocs(
      item.personalDetails?.additionalDocuments
    ),
    Service_Type: item.serviceDetails?.type || '',
    Organization: item.serviceDetails?.organization || '',
    Assigned_Households: (item.serviceDetails?.assignedHouseholds || []).join(
      ', '
    ),
    Joining_Date: item.serviceDetails?.joinedOn
      ? new Date(item.serviceDetails.joinedOn).toLocaleDateString()
      : '',
    Vehicle_Type: item.vehicleDetails?.type || '',
    Vehicle_Number: item.vehicleDetails?.number || '',
    Employee_Photo_URL: item.employee?.employeephotoUrl || '',
    Identification_Card_URL: item.employee?.identificationCardUrl || '',
    Created_At: item.createdAt ? new Date(item.createdAt).toLocaleString() : '',
    Updated_At: item.updatedAt ? new Date(item.updatedAt).toLocaleString() : '',
  }));
}
