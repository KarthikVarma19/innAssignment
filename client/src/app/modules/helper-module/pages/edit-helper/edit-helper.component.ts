import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperformComponent } from '../../components/helperform/helperform.component';
import { HelperService } from '../../services/helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HelperUtilityService } from '../../services/helper-utility.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-helper',
  standalone: true,
  imports: [
    HelperformComponent,
    NgFor,
    NgIf,
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './edit-helper.component.html',
  styleUrl: './edit-helper.component.scss',
})
export class EditHelperComponent {
  helperData: any;
  editHelperSidebar: any;
  selectedChild: string;
  id: string | undefined = '';

  constructor(
    private helperService: HelperService,
    private route: ActivatedRoute,
    private helperUtility: HelperUtilityService,
    private router: Router,
    private toastr: ToastrService
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
  }
  onChildClick(childName: string) {
    this.selectedChild = childName;
  }

  @ViewChild(HelperformComponent) helperFormComp!: HelperformComponent;

  saveButtonClicked() {
    const currentFormData = this.helperFormComp.helperForm.value;
    // if (this.helperFormComp.helperForm.invalid) {
    //   this.helperFormComp.helperForm.markAllAsTouched();
    //   return;
    // }

    // if (!this.helperFormComp.helperForm.touched) {
    //   return;
    // }

    const childData = this.helperFormComp.getEditHelperSaveButtonGetData();
    const compiledHelperFormData =
      this.helperUtility.compileFormData(childData);

    if (this.id === '') {
      return;
    }

    this.helperUtility
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
                this.toastr.error('everything is broken', 'Major Error', {
                  timeOut: 1500,
                });
              },
              complete: () => {
                this.toastr.success(
                  'Helper details updated successfully!',
                  'Success'
                );
              },
            });
        },
      });
  }

  saveButton: string = 'Save';
  ngOnInit(): void {}
}
