import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperformComponent } from '../../components/helperform/helperform.component';
import { HelperService } from '../../services/helper.services';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-helper',
  standalone: true,
  imports: [HelperformComponent, NgFor, NgIf, CommonModule, RouterModule],
  templateUrl: './edit-helper.component.html',
  styleUrl: './edit-helper.component.scss',
})
export class EditHelperComponent implements OnInit {
  helperData: any;
  editHelperSidebar: any;
  selectedChild: string;

  constructor(
    private helperService: HelperService,
    private route: ActivatedRoute
  ) {
    this.editHelperSidebar = [
      { name: 'Helper Details', icon: 'handyman' },
      { name: 'Documents', icon: 'description' },
    ];

    this.selectedChild = 'Helper Details'; // defaut select first child
  }
  onChildClick(childName: string) {
    this.selectedChild = childName;
  }

  @ViewChild(HelperformComponent) helperFormComp!: HelperformComponent;

  saveButtonClicked() {
    const childData = this.helperFormComp.getEditHelperSaveButtonGetData();
    console.log(childData);
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.helperService.getHelperById(id).subscribe((d) => {
        this.helperData = d.data;
      });
    }
  }
}
