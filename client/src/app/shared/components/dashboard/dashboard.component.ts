import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, X} from 'lucide-angular';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
readonly Search = Search;
  readonly X = X;
  searchText: string = '';
  // choice 1: show total data initially : 8 results
  // choice 2: show only filteredData : 5 of 8 results
  resultData: string = "5 of 8 results";
  removeSearchText(): void {
    this.searchText = '';
  }
}
