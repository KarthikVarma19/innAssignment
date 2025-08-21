import {
  Component,
  ChangeDetectorRef,
  ViewContainerRef,
  ViewChild,
  OnInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { HelperformComponent } from '../../components/helperform/helperform.component';
import { HelperUtilService } from '../../services/helper-util.service';
import { DialogboxMessageComponent } from '../../../../shared/components/dialogbox-message/dialogbox-message.component';
import { DialogboxDocumentDownloadComponent } from '../../../../shared/components/dialogbox-document-download/dialogbox-document-download.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HelperdataComponent } from '../../components/helperdata/helperdata.component';

@Component({
  selector: 'app-addhelper',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HelperdataComponent,
    CommonModule,
    HelperformComponent,
    RouterModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './add-helper.component.html',
  styleUrl: './add-helper.component.scss',
})
export class AddhelperComponent implements OnInit, OnDestroy {
  currentStageOfAddingHelper: number;
  finalStageOfAddingHelper: number;
  compiledHelperFormData: IHelperData;
  helperPresentationData: any;
  skeletonA: boolean;
  addHelperButtonClicked: boolean;
  buttonClicked: number;
  helperData: any;
  @ViewChild('addHelperSuccessDialog', { read: ViewContainerRef })
  addHelperSuccessDialog!: ViewContainerRef;
  @ViewChild('addHelperIdentificationCard', { read: ViewContainerRef })
  addHelperIdentificationCard!: ViewContainerRef;

  constructor(
    private helperService: HelperService,
    private cdr: ChangeDetectorRef,
    private helperUtilService: HelperUtilService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.compiledHelperFormData = {
      personalDetails: {
        kycDocument: {
          type: '', // Assuming no mapping for kycDocument in the provided data
          url: '',
          filename: '',
          filesize: 0,
        },
        fullName: '',
        gender: '',
        languages: [],
        phone: '',
        email: '',
        additionalDocuments: [], // Assuming no mapping for additionalDocuments in the provided data
      },
      serviceDetails: {
        type: '',
        organization: '',
        assignedHouseholds: [], // Assuming no mapping for assignedHouseholds in the provided data
        joinedOn: new Date(), // Assuming no mapping for joinedOn in the provided data
      },
      vehicleDetails: {
        type: '',
        number: '',
      },
      employee: {
        employeephotoUrl: '',
      },
    };
    this.currentStageOfAddingHelper = 1;
    this.finalStageOfAddingHelper = 3;
    this.skeletonA = false;
    this.addHelperButtonClicked = false;
    this.buttonClicked = 0;
  }

  private removeListenerFn!: () => void;

  ngOnInit(): void {
    this.removeListenerFn = this.renderer.listen(
      'window',
      'beforeunload',
      (event: BeforeUnloadEvent) => {
        event.preventDefault();
      }
    );
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.removeListenerFn) {
      this.removeListenerFn();
    }
  }

  // TODO: should only show this if the user has updated any field in the form
  canDeactivate(): boolean {
    if (this.addHelperButtonClicked) {
      return true;
    }
    return confirm('Changes you made may not be saved.');
  }

  createHelperUtil() {
    this.addHelperButtonClicked = true;
    this.helperUtilService
      .storeFilesInCloud({
        kycDocumentBase64:
          this.compiledHelperFormData.personalDetails.kycDocument.url,
        kycDocumentFileDivisionType:
          this.compiledHelperFormData.personalDetails.kycDocument.type,
        kycDocumentFileName:
          this.compiledHelperFormData.personalDetails.kycDocument.filename,
        profilePic: this.compiledHelperFormData.employee.employeephotoUrl,
        helperFullName: this.compiledHelperFormData.personalDetails.fullName,
      })
      .subscribe({
        next: (res) => {
          this.compiledHelperFormData.employee.employeephotoUrl =
            res.uploaded?.profilePic ||
            `https://ui-avatars.com/api/?name=${this.compiledHelperFormData.personalDetails.fullName}&background=random&color=fff&rounded=true&bold=true&size=32`;
          this.compiledHelperFormData.personalDetails.kycDocument.url =
            res.uploaded?.kycDocument;

          this.helperService
            .createHelper(this.compiledHelperFormData)
            .subscribe((res) => {
              const helper_id = res.data.helper._id;
              this.openDialogAfterAddHelperClicked({
                dialogHeading: 'Helper Added Successfully',
                success: true,
                contextData: res.data.helper.personalDetails.fullName,
                status: 'Added',
                logo: 'https://res.cloudinary.com/karthikvarma/image/upload/v1755583092/inn-assignement/helpers/assets/tomoto-success_qcueea.gif',
              });
              this.helperService.getIdCard(helper_id).subscribe((res) => {
                const identificationCardUrl = res.data.identificationCardUrl;
                this.openDialogOfAddedHelperIdentificationCard(
                  identificationCardUrl
                );
              });
            });
        },
        error: () => {
          this.openDialogAfterAddHelperClicked({
            dialogHeading: 'Failed to Add Helper',
            success: false,
            contextData: this.compiledHelperFormData.personalDetails.fullName,
            status: 'Add Failed',
            logo: 'https://res.cloudinary.com/karthikvarma/image/upload/v1755583129/inn-assignement/helpers/assets/tomato-error_zivier.gif',
          });
        },
      });
  }

  goToPreviousStageOfAddingHelper() {
    this.currentStageOfAddingHelper -= 1;
    this.cdr.markForCheck();
  }

  goToNextStageOfAddingHelper() {
    if (this.currentStageOfAddingHelper === 1) {
      this.buttonClicked++;
      return;
    }
    setTimeout(() => {
      this.currentStageOfAddingHelper++;
    });
  }

  handleStageOneHelperFormData(data: any) {
    this.helperData = data;
    this.compiledHelperFormData = this.helperUtilService.compileFormData(
      data,
      false
    );
    this.helperPresentationData = {
      context: 'preview',
      data: this.compiledHelperFormData,
    };
    setTimeout(() => {
      this.currentStageOfAddingHelper++;
    });
    this.cdr.detectChanges();
  }

  openDialogAfterAddHelperClicked(message: {
    dialogHeading: string;
    success: boolean;
    contextData: string;
    status: string;
    logo: string;
  }): void {
    this.addHelperSuccessDialog.clear();
    const dialogRef = this.addHelperSuccessDialog.createComponent(
      DialogboxMessageComponent
    );
    dialogRef.setInput('message', message);
    dialogRef.instance.close = () => {
      this.addHelperSuccessDialog.clear();
    };
  }

  openDialogOfAddedHelperIdentificationCard(helperIdentificationurl: string) {
    this.addHelperIdentificationCard.clear();
    const dialogRef = this.addHelperIdentificationCard.createComponent(
      DialogboxDocumentDownloadComponent
    );
    dialogRef.setInput('componentHeading', 'Helper Identification Card');
    dialogRef.setInput('documentUrl', helperIdentificationurl);
    dialogRef.instance.close = () => {
      this.addHelperIdentificationCard.clear();
      this.router.navigate(['/dashboard', 'staff-management', 'helpers']);
    };
  }
}

interface IHelperData {
  personalDetails: {
    kycDocument: {
      type: string;
      url: string;
      filesize: number;
      filename: string;
    };
    fullName: string;
    gender: string;
    languages: string[];
    phone: string;
    email: string;
    additionalDocuments: any[];
  };
  serviceDetails: {
    type: string;
    organization: string;
    assignedHouseholds: string[];
    joinedOn: Date;
  };
  vehicleDetails: {
    type: string;
    number: string;
  };
  employee: {
    employeephotoUrl: string;
  };
}

interface Base64Meta {
  mimeType: string;
  base64: string;
  filename?: string;
}
