import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrService } from 'ngx-toastr';
import { HelperformComponent } from '../../components/helperform/helperform.component';
import { HelperService } from '../../services/helper.service';
import { HelperUtilService } from '../../services/helper-util.service';
@Component({
  selector: 'app-edit-helper',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HelperformComponent,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './edit-helper.component.html',
  styleUrl: './edit-helper.component.scss',
})
export class EditHelperComponent implements OnInit, OnDestroy {
  helperData: any;
  editHelperSidebar: Array<{ name: string; icon: string }>;
  selectedChild: string;
  id: string | undefined;
  @ViewChild(HelperformComponent) helperFormComp!: HelperformComponent;
  saveButton: string;

  constructor(
    private helperService: HelperService,
    private route: ActivatedRoute,
    private helperUtilService: HelperUtilService,
    private router: Router,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.editHelperSidebar = [
      { name: 'Helper Details', icon: 'handyman' },
      { name: 'Documents', icon: 'description' },
    ];
    this.selectedChild = 'Helper Details';
    if (this.id) {
      this.helperService.getHelperById(this.id).subscribe((d) => {
        this.helperData = d.data;
      });
    }
    this.saveButton = 'Save';
  }

  ngOnInit(): void {
    this.removeListenerFn = this.renderer.listen(
      'window',
      'beforeunload',
      (event: BeforeUnloadEvent) => {
        event.preventDefault();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.removeListenerFn) {
      this.removeListenerFn();
    }
  }
  //TODO: You Should Request the helper-form did the user made any changes then only reutrn confirm else return true
  // after the edit helper button is clicked the confirm message should not be showed
  canDeactivate(): boolean {
    return confirm('Changes you made may not be saved.');
  }

  onChildClick(childName: string) {
    this.selectedChild = childName;
  }

  private removeListenerFn!: () => void;
  // TODO: Save Only If user Has Done Changes
  saveButtonClicked() {
    // const currentFormData = this.helperFormComp.helperForm.value;
    // if (this.helperFormComp.helperForm.invalid) {
    //   this.helperFormComp.helperForm.markAllAsTouched();
    //   return;
    // }

    // if (!this.helperFormComp.helperForm.touched) {
    //   return;
    // }

    const childData = this.helperFormComp.getEditHelperSaveButtonGetData();
    const compiledHelperFormData =
      this.helperUtilService.compileFormData(childData);
    if (this.id === '') {
      return;
    }

    this.helperUtilService
      .storeFilesInCloud({
        kycDocumentBase64:
          compiledHelperFormData.personalDetails.kycDocument.url,
        kycDocumentFileDivisionType:
          compiledHelperFormData.personalDetails.kycDocument.type,
        kycDocumentFileName:
          compiledHelperFormData.personalDetails.kycDocument.filename,
        profilePic: compiledHelperFormData.employee.employeephotoUrl,
        helperFullName: compiledHelperFormData.personalDetails.fullName,
      })
      .subscribe({
        next: (res) => {
          compiledHelperFormData.employee.employeephotoUrl =
            res.uploaded?.profilePic ||
            compiledHelperFormData.employee.employeephotoUrl;
          compiledHelperFormData.personalDetails.kycDocument.url =
            res.uploaded?.kycDocument ||
            compiledHelperFormData.personalDetails.kycDocument.url;
          this.saveButton = 'Files Uploaded';

          this.helperService
            .updateHelper(this.id!, compiledHelperFormData)
            .subscribe({
              next: () => {
                this.saveButton = 'Changes Saved';

                this.router.navigate([
                  '/dashboard',
                  'staff-management',
                  'helpers',
                ]);
              },
              error: () => {
                this.toastr.error('', 'Error while Saving!');
              },
              complete: () => {
                this.toastr.success('', 'Changes Saved!');
              },
            });
        },
      });
  }
}
