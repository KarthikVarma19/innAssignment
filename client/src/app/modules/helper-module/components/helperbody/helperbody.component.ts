import { HelperdataComponent } from './helperdata/helperdata.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../../services/helper.services';

@Component({
  selector: 'app-helperbody',
  standalone: true,
  imports: [HelperdataComponent, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './helperbody.component.html',
  styleUrl: './helperbody.component.scss',
})
export class HelperbodyComponent implements OnInit {
  helpersData: any[] = [];

  helperData: any;

  constructor(private helperService: HelperService) {}

  ngOnInit(): void {
    this.helperService.getAllHelpersMetaData().subscribe((helperData) => {
      const { data } = helperData;
      this.helpersData = data;
      this.helperData = this.helpersData[0];
    });
  }
}
