import { NgFor, NgStyle, NgIf } from '@angular/common';
import {
  Component,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  EventEmitter,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrService } from 'ngx-toastr';
import {
  HelperSection,
  IHelperProfileSummary,
} from '../../adapters/helperdata-adapter';
import { HelperService } from '../../services/helper.service';
import { DialogboxConfirmationComponent } from '../../../../shared/components/dialogbox-confirmation/dialogbox-confirmation.component';
import { DialogboxDocumentDownloadComponent } from '../../../../shared/components/dialogbox-document-download/dialogbox-document-download.component';
import { HelperUtilService } from '../../services/helper-util.service';
@Component({
  selector: 'app-helperdata',
  standalone: true,
  imports: [
    NgStyle,
    NgFor,
    NgIf,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './helperdata.component.html',
  styleUrl: './helperdata.component.scss',
})
export class HelperdataComponent {
  helperSections: HelperSection[];
  helperHeaderInfo: IHelperProfileSummary;
  @Input() helperDisplayData: IHelperDataComponentInput;
  @Output() deleteButtonEvent: EventEmitter<boolean>;
  @ViewChild('deleteDialog', { read: ViewContainerRef })
  deleteDialog!: ViewContainerRef;
  @ViewChild('documentDialog', { read: ViewContainerRef })
  documentDialog!: ViewContainerRef;

  constructor(
    private helperService: HelperService,
    private helperUtilService: HelperUtilService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.helperSections = [];
    this.helperHeaderInfo = {
      helperName: '',
      helperSubtitle: '',
      helperImage: '',
      helperHouseholds: 0,
    };
    this.helperDisplayData = {
      context: 'preview',
      data: null,
    };
    this.deleteButtonEvent = new EventEmitter<boolean>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['helperDisplayData']?.currentValue?.data !==
        changes['helperDisplayData']?.previousValue?.data ||
      changes['helperDisplayData']?.currentValue?.context !==
        changes['helperDisplayData']?.previousValue?.context
    ) {
      const context = this.helperDisplayData.context;
      const data = this.helperDisplayData.data;
      if (context === 'edit' || context === 'preview' || context === 'admin') {
        const transformedData = this.helperUtilService.getDataTransformed(
          context,
          data
        );
        this.helperHeaderInfo = transformedData.helperHeaderInfo;
        this.helperSections = transformedData.sections;
      }
    }
  }

  deleteHelper(data: { _id: string; helperName: string }): void {
    this.deleteDialog.clear();
    const dialogRef = this.deleteDialog.createComponent(
      DialogboxConfirmationComponent
    );
    dialogRef.setInput('data', {
      logo: 'https://res.cloudinary.com/karthikvarma/image/upload/v1755586880/inn-assignement/helpers/assets/warning_ijpqst.png',
      confirmationType: 'Delete',
      confirmationDescription: data.helperName,
      confirmationWarning: 'You can`t undo this action.',
    });
    dialogRef.instance.close = () => {
      this.deleteDialog.clear();
    };

    dialogRef.instance.cancelButtonClicked = () => {
      this.deleteDialog.clear();
    };
    dialogRef.instance.confirmButtonClicked = () => {
      this.helperService.deleteHelper(data._id).subscribe({
        next: () => {},
        error: () => {
          this.toastr.error('', 'Error while Deleting!');
        },
        complete: () => {
          this.toastr.warning('', `Deleted ${'`' + data.helperName + '`'}`);
        },
      });
      this.deleteButtonEvent.emit(true);
      this.deleteDialog.clear();
    };
  }

  isDataIsValidUrl(data: string): boolean {
    try {
      new URL(data);
      return true;
    } catch (error) {
      return false;
    }
  }

  openDocumentDialog(documentLabel: string, documentUrl: string) {
    this.documentDialog.clear();
    const dialogRef = this.documentDialog.createComponent(
      DialogboxDocumentDownloadComponent
    );
    dialogRef.setInput(
      'componentHeading',
      `${this.helperHeaderInfo.helperName + ' ' + documentLabel}`
    );
    dialogRef.setInput('documentUrl', documentUrl);
    dialogRef.instance.close = () => {
      this.documentDialog.clear();
    };
  }
}

interface IHelperDataComponentInput {
  context: 'edit' | 'preview' | 'admin';
  data: any;
}
