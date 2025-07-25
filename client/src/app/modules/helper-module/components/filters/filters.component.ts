import { NgIf } from '@angular/common';
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ArrowDownUp, Funnel, Calendar, Search, X, Download, Plus} from 'lucide-angular';

import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [LucideAngularModule, NgIf, FormsModule, RouterLink],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  readonly ArrowDownUp = ArrowDownUp;
  readonly Funnel = Funnel;
  readonly Calendar = Calendar;
  readonly Search = Search;
  readonly X = X;
  readonly Download = Download;
  readonly Plus = Plus;
  searchText: string = '';
  // choice 1: show total data initially : 8 results
  // choice 2: show only filteredData : 5 of 8 results
  resultData: string = "5 of 8 results";
  removeSearchText(): void {
    this.searchText = '';
  }
}
