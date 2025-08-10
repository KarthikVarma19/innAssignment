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

export class HelperDataAdapter {
  static fromAddHelperPageFinalStage(data: any): IHelperDetailsDisplay {
    return {
      sections: [
        {
          sectionTitle: 'Personal Details',
          fields: [
            { label: 'Gender', data: data.personalDetails?.gender || '' },
            { label: 'Languages', data: data.personalDetails?.languages || '' },
            { label: 'Phone', data: '+' + data.personalDetails?.phone || '' },
            { label: 'Email', data: data.personalDetails?.email || '' },
            // {
            //   label: 'KYC Document URL',
            //   data: data.personalDetails?.kycDocument?.url || '',
            // },
          ],
        },
        {
          sectionTitle: 'Service Details',
          fields: [
            { label: 'Type', data: data.serviceDetails?.type || '' },
            {
              label: 'Organization',
              data: data.serviceDetails?.organization || '',
            },
            {
              label: 'Joined On',
              data: data.serviceDetails?.joinedOn
                ? new Date(data.serviceDetails.joinedOn).toLocaleDateString(
                    'en-GB'
                  )
                : '',
            },
          ],
        },
      ],
      context: 'preview',
      helperHeaderInfo: {
        helperName: data.personalDetails?.fullName || '',
        helperSubtitle: data.serviceDetails?.type || '',
        helperImage: data.employee?.employeephotoUrl || '',
        helperHouseholds: data.serviceDetails?.households || 0,
      },
    };
  }

  static fromBackend(data: any): IHelperDetailsDisplay {
    if (!data) {
      return {
        sections: [],
        context: 'admin',
        helperHeaderInfo: {
          helperName: '',
          helperSubtitle: '',
          helperImage: '',
          helperHouseholds: 0,
        },
      };
    }

    return {
      sections: [
        {
          sectionTitle: 'EMPLOYEE ID',
          fields: [
            {
              label: 'Identification Card',
              data: data.employee?.identificationCardUrl || '-',
            },
            { label: 'Employee Code', data: data.employee.employeeId || '-' },
          ],
        },
        {
          sectionTitle: 'PERSONAL DETAILS',
          fields: [
            { label: 'Gender', data: data.personalDetails.gender || '-' },
            {
              label: 'Language(s)',
              data: data.personalDetails.languages?.join(', ') || '-',
            },
            { label: 'Mobile No.', data: data.personalDetails.phone || '-' },
            { label: 'Email ID', data: data.personalDetails.email || '-' },
            {
              label: 'KYC Document',
              data: data.personalDetails.kycDocument?.url || '-',
            },
          ],
        },
        {
          sectionTitle: 'SERVICE DETAILS',
          fields: [
            { label: 'Type', data: data.serviceDetails.type || 'None' },
            {
              label: 'Organization',
              data: data.serviceDetails.organization || '-',
            },
            {
              label: 'Joined On',
              data: data.serviceDetails?.joinedOn
                ? new Date(data.serviceDetails.joinedOn).toLocaleDateString()
                : '-',
            },
          ],
        },
      ],
      context: 'admin',
      helperHeaderInfo: {
        helperName: data.personalDetails?.fullName || '',
        helperSubtitle: data.serviceDetails?.type || '',
        helperImage: data.employee?.employeephotoUrl || '',
        helperHouseholds: data.serviceDetails?.households || 0,
      },
    };
  }

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
