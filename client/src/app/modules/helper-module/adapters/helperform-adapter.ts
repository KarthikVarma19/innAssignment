export interface HelperField {
  label: string;
  data: string;
}

export interface HelperSection {
  sectionTitle: string;
  fields: HelperField[];
}

export interface IHelperProfileSummary {
  helperName: string;
  helperSubtitle: string;
  helperImage: string;
  helperHouseholds: number;
}

export interface IHelperDetailsDisplay {
  sections: HelperSection[];
  context: 'edit' | 'preview' | 'admin';
  helperHeaderInfo: IHelperProfileSummary;
}

export class HelperFormAdapter {
  static toBackend(data: IHelperDetailsDisplay): any {
    return {
      employee: {
        identificationCardUrl:
          data.sections
            .find((section) => section.sectionTitle === 'EMPLOYEE ID')
            ?.fields.find((field) => field.label === 'Identification Card')
            ?.data || '',
        employeeId:
          data.sections
            .find((section) => section.sectionTitle === 'EMPLOYEE ID')
            ?.fields.find((field) => field.label === 'Employee Code')?.data ||
          '',
        employeephotoUrl: data.helperHeaderInfo.helperImage || '',
      },
      personalDetails: {
        gender:
          data.sections
            .find((section) => section.sectionTitle === 'PERSONAL DETAILS')
            ?.fields.find((field) => field.label === 'Gender')?.data || '',
        languages:
          data.sections
            .find((section) => section.sectionTitle === 'PERSONAL DETAILS')
            ?.fields.find((field) => field.label === 'Language(s)')
            ?.data.split(', ') || [],
        phone:
          data.sections
            .find((section) => section.sectionTitle === 'PERSONAL DETAILS')
            ?.fields.find((field) => field.label === 'Mobile No.')?.data || '',
        email:
          data.sections
            .find((section) => section.sectionTitle === 'PERSONAL DETAILS')
            ?.fields.find((field) => field.label === 'Email ID')?.data || '',
        kycDocument: {
          url:
            data.sections
              .find((section) => section.sectionTitle === 'PERSONAL DETAILS')
              ?.fields.find((field) => field.label === 'KYC Document')?.data ||
            '',
        },
        fullName: data.helperHeaderInfo.helperName || '',
      },
      serviceDetails: {
        type:
          data.sections
            .find((section) => section.sectionTitle === 'SERVICE DETAILS')
            ?.fields.find((field) => field.label === 'Type')?.data || '',
        organization:
          data.sections
            .find((section) => section.sectionTitle === 'SERVICE DETAILS')
            ?.fields.find((field) => field.label === 'Organization')?.data ||
          '',
        joinedOn: data.sections
          .find((section) => section.sectionTitle === 'SERVICE DETAILS')
          ?.fields.find((field) => field.label === 'Joined On')?.data
          ? new Date(
              data.sections
                .find((section) => section.sectionTitle === 'SERVICE DETAILS')
                ?.fields.find((field) => field.label === 'Joined On')?.data ??
                ''
            ).toISOString()
          : '',
        households: data.helperHeaderInfo.helperHouseholds || 0,
      },
    };
  }
}
