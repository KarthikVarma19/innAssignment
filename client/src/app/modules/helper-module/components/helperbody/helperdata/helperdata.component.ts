import { NgFor, NgStyle, NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { HelperService } from '../../../services/helper.service';
import {
  HelperSection,
  IHelperProfileSummary,
} from '../../../adapters/helperdata-adapter';
import { DialogboxDocumentDownloadComponent } from '../../../../../shared/components/dialogbox-document-download/dialogbox-document-download.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DialogboxConfirmationComponent } from '../../../../../shared/components/dialogbox-confirmation/dialogbox-confirmation.component';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-helperdata',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgStyle,
    NgFor,
    NgIf,
    RouterModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './helperdata.component.html',
  styleUrl: './helperdata.component.scss',
})
export class HelperdataComponent implements OnInit {
  @Input() helperDisplayData: IHelperDataComponentInput;

  helperSections: HelperSection[];
  helperHeaderInfo: IHelperProfileSummary;

  constructor(private helperService: HelperService, private router: Router) {
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
  }

  ngOnInit(): void {}

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
        const transformedData = this.helperService.getDataTransformed(
          context,
          data
        );
        this.helperHeaderInfo = transformedData.helperHeaderInfo;
        this.helperSections = transformedData.sections;
      }
    }
  }

  @ViewChild('deleteDialog', { read: ViewContainerRef })
  deleteDialog!: ViewContainerRef;

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
      this.helperService.deleteHelper(data._id).subscribe();
      this.deleteButtonEvent.emit(true);
      this.deleteDialog.clear();
    };
  }

  @Output() deleteButtonEvent = new EventEmitter<boolean>();

  isDataIsValidUrl(data: string): boolean {
    try {
      new URL(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @ViewChild('documentDialog', { read: ViewContainerRef })
  documentDialog!: ViewContainerRef;

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
