import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import dayjs from 'dayjs/esm';
import relativeTime from 'dayjs/esm/plugin/relativeTime';
dayjs.extend(relativeTime);

import { NgSelectModule } from '@ng-select/ng-select';

import { HelperdataComponent } from './helperdata/helperdata.component';

import { HelperService } from '../../services/helper.service';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-helperbody',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatCardModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
    NgSelectModule,
    InfiniteScrollModule,
    NgxDaterangepickerMd,
    HelperdataComponent,
  ],
  providers: [],
  templateUrl: './helperbody.component.html',
  styleUrl: './helperbody.component.scss',
})
export class HelperbodyComponent implements OnInit, OnDestroy {
  helpersData: any[] = [];
  filteredHelperData: any[];
  helperDetails: any;

  displayFilteredDateRangeText = '';
  ranges: any = {
    Today: [dayjs(), dayjs()],
    Yesterday: [dayjs().subtract(1, 'days'), dayjs().subtract(1, 'days')],
    'Last 7 Days': [dayjs().subtract(6, 'days'), dayjs()],
    'Last 30 Days': [dayjs().subtract(29, 'days'), dayjs()],
    'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
    'Last Month': [
      dayjs().subtract(1, 'month').startOf('month'),
      dayjs().subtract(1, 'month').endOf('month'),
    ],
  };

  model: any = { start: Date, end: new Date() };
  isBrowser: boolean;
  datesUpdated(event: any) {
    if (event.startDate === null || event.endDate === null) return;
    console.log(event.startDate);
    console.log(event.endDate);
    const startDate = dayjs(event.startDate).toDate();
    const endDate = dayjs(event.endDate).toDate();
    this.filterOptions.joiningStartDate = startDate;
    this.filterOptions.joiningEndDate = endDate;
    const displayEndDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);

    const formatedStartDate =
      startDate.getDate() +
      '/' +
      (startDate.getMonth() + 1) +
      '/' +
      startDate.getFullYear().toString().substring(2);
    const formatedEndDate =
      displayEndDate.getDate() +
      '/' +
      (displayEndDate.getMonth() + 1) +
      '/' +
      displayEndDate.getFullYear().toString().substring(2);
    this.displayFilteredDateRangeText =
      formatedStartDate === formatedEndDate
        ? formatedStartDate
        : formatedStartDate + ' To ' + formatedEndDate;
    this.loadInitialData();
  }
  datesCleared = () => {
    this.clearDatesData();
    this.loadInitialData();
  };
  clearDatesData() {
    this.displayFilteredDateRangeText = '';
    this.filterOptions.joiningStartDate = new Date('2000-01-01');
    this.filterOptions.joiningEndDate = new Date();
  }

  showSortBy: boolean = false;
  sortDropDownItems = [
    {
      label: 'Helpers Name (A-Z)',
      value: 'employeeName',
    },
    {
      label: 'Employee ID',
      value: 'employeeId',
    },
  ];

  filterOptions = {
    sortby: 'employeeName',
    serviceTypes: [],
    organizations: [],
    joiningStartDate: new Date('2000-01-01'),
    joiningEndDate: new Date(),
    searchHelperBasedOnNameEmployeeIdPhone: '',
  };

  filterOptionsCleared() {
    this.filterOptions = {
      sortby: 'employeeName',
      serviceTypes: [],
      organizations: [],
      joiningStartDate: new Date('2000-01-01'),
      joiningEndDate: new Date(),
      searchHelperBasedOnNameEmployeeIdPhone: '',
    };
    this.clearFiltersData();
    this.clearDatesData();
    this.loadInitialData();
  }

  sortHelpers(event: Event, property: string) {
    this.filterOptions.sortby = property;
    this.showSortBy = false;
    event.stopPropagation();
    console.log(this.filterOptions);
    this.loadInitialData();
  }
  toggleSortDropDown(event: Event) {
    this.showSortBy = !this.showSortBy;
    event.stopPropagation();
  }
  // Filtering
  showFilterByDropDown: boolean = false;
  filterBadgeHidden: boolean = true;
  badgeNumber: number = 0;
  toggleFilterByDropDown(event: Event) {
    this.showFilterByDropDown = !this.showFilterByDropDown;
    event.stopPropagation();
  }
  onSelected(values: any[]) {
    console.log('Selected values:', values);
  }

  @HostListener('document:click')
  handleClickOutside() {
    if (this.showSortBy) {
      this.showSortBy = false;
    }
    if (this.showFilterByDropDown) {
      console.log('clicked');
      this.showFilterByDropDown = false;
    }
  }

  helperFilterForm: FormGroup;
  typeOfServiceOptions = [
    { value: 'Maid', label: 'Maid' },
    { value: 'Cook', label: 'Cook' },
    { value: 'Nurse', label: 'Nurse' },
    { value: 'Driver', label: 'Driver' },
  ];
  organizationNameOptions = [
    { value: 'ASBL', label: 'ASBL' },
    { value: 'Springs Helpers', label: 'Springs Helpers' },
  ];

  filterContainerDropDown(event: Event) {
    event.stopPropagation();
  }

  filtersReset(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.clearFiltersData();
    this.loadInitialData();
  }

  clearFiltersData() {
    this.helperFilterForm.get('typeOfService')?.setValue('');
    this.helperFilterForm.get('organizationName')?.setValue('');
    this.badgeNumber = 0;
    this.filterBadgeHidden = true;
    this.filterOptions.serviceTypes = [];
    this.filterOptions.organizations = [];
  }

  deleteHelperEventReceived(clicked: boolean) {
    if (clicked) {
      this.filterOptionsCleared();
    }
  }

  filtersApplied(event: Event) {
    this.badgeNumber = 0;
    const typeOfServiceFormField = this.helperFilterForm.get('typeOfService');
    const organizationNameFormField =
      this.helperFilterForm.get('organizationName');
    if (typeOfServiceFormField?.value?.length > 0) {
      this.filterOptions.serviceTypes = typeOfServiceFormField?.value;
      this.badgeNumber++;
    }
    if (organizationNameFormField?.value?.length > 0) {
      this.filterOptions.organizations = organizationNameFormField?.value;
      this.badgeNumber++;
    }
    this.filterBadgeHidden = !(this.badgeNumber > 0);
    this.toggleFilterByDropDown(event);

    console.log(this.filterOptions);
    this.loadInitialData();
  }

  constructor(
    private helperService: HelperService,
    private excelService: ExcelService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder
  ) {
    this.helpersData = [];
    this.filteredHelperData = [];
    this.helperDetails = {
      context: 'admin',
      data: null,
    };
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.helperFilterForm = this.fb.group({
      typeOfService: [''],
      organizationName: [''],
    });

    this.searchInput.pipe(debounceTime(300)).subscribe((searchTerm: string) => {
      this.searchForHelper(searchTerm);
    });
  }

  searchText: string = '';
  onSearchInputChange() {
    this.searchInput.next(this.searchText);
  }

  ngOnDestroy() {
    this.searchInput.complete();
  }

  getHelperDetails(_helperObjectId: string) {
    // if it is already the same data that is already in view
    if (this.helperDetails.data._id === _helperObjectId) return;

    const foundData = this.helpersData.find(
      (helper) => helper._id === _helperObjectId
    );

    this.helperDetails = {
      ...this.helperDetails,
      data: foundData,
    };
  }

  // Pagination properties
  pageSize: number = 100;
  pageIndex: number = 1;
  pageSizeOptions = [5, 10, 25, 100];
  isLoading = false;

  toggleLoading = () => (this.isLoading = !this.isLoading);

  helpersMetaData: {
    total: number;
    filteredTotal: number;
    page: number;
    limit: number;
    totalPages: number;
  } = {
    total: 0,
    filteredTotal: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  };

  loadInitialData() {
    this.pageSize = 100;
    this.pageIndex = 1;
    this.toggleLoading();
    this.helperService
      .getHelpersPaged(this.pageIndex, this.pageSize, this.filterOptions)
      .subscribe({
        next: (response) => {
          this.helpersData = [...response.data];
          this.helpersMetaData = response.meta;
          console.log(this.helpersMetaData);
          this.helperDetails = { data: this.helpersData[0], context: 'admin' };
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.toggleLoading();
        },
      });
  }

  // // Called when the paginator changes page
  // onPageChange(event: any) {
  //   this.pageIndex = event.pageIndex;
  //   this.pageSize = event.pageSize;
  //   this.fetchPagedHelpers();
  // }

  // pagedHelperData: any[] = [];

  // fetchPagedHelpers() {
  //   this.helperService
  //     .getHelpersPaged(this.pageIndex, this.pageSize)
  //     .subscribe((response) => {
  //       this.helpersData = [...this.helpersData, ...response.data];
  //       this.helperDetails = { data: this.helpersData[0], context: 'admin' };
  //     });
  // }

  ngOnInit(): void {
    // this.fetchPagedHelpers();
    // this.helperService.getAllHelpers().subscribe((subdata) => {
    //   this.helpersData = subdata;
    //   this.helperDetails = { data: this.helpersData[0], context: 'admin' };
    // });
    this.pageIndex = 1;
    this.loadInitialData();
  }

  appendData = () => {
    this.toggleLoading();
    this.helperService
      .getHelpersPaged(this.pageIndex, this.pageSize, this.filterOptions)
      .subscribe({
        next: (response) => {
          this.helpersMetaData.filteredTotal += response.meta.filteredTotal;
          this.helpersData = [...this.helpersData, ...response.data];
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.toggleLoading();
        },
      });
  };

  searchInput = new Subject<string>();

  // choice 1: show total data initially : 8 helpers
  // choice 2: show only filteredData : 5 of 8 helpers

  removeSearchText(): void {
    this.filterOptions.searchHelperBasedOnNameEmployeeIdPhone = '';
    this.searchText = '';
    // this.helperDetails = { data: this.helpersData[0], context: 'admin' };
    // this.loadInitialData();
    this.loadInitialData();
  }

  searchForHelper(searchTerm: string): void {
    this.filterOptions.searchHelperBasedOnNameEmployeeIdPhone =
      searchTerm.toLowerCase();
    this.loadInitialData();

    // this.filteredHelperData = this.helpersData.filter(
    //   (helper) =>
    //     helper.personalDetails?.fullName
    //       .toLowerCase()
    //       .includes(searchTerm.toLowerCase()) ||
    //     (searchTerm &&
    //       !isNaN(Number(searchTerm)) &&
    //       Number(helper.employee?.employeeId) === Number(searchTerm)) ||
    //     helper.personalDetails?.phone
    //       .toLowerCase()
    //       .includes(searchTerm.toLowerCase())
    // );
    // this.filteredHelperData = this.helpersData;

    // this.helperDetails = { data: this.filteredHelperData[0], context: 'admin' };
  }

  downloadClicked() {
    const fileName = 'helpers_data_' + new Date().toISOString() + '.xlsx';
    if (
      window.confirm(
        'Do You Want to Download the Helpers Data in Excel Sheet Format?'
      )
    ) {
      this.excelService.downloadExcel(this.helpersData, fileName);
    }
  }

  getSafeImageUrl(helper: any) {
    const image = helper.employee?.employeephotoUrl;
    if (!image || image.trim() === '') {
      return `https://ui-avatars.com/api/?name=${helper.personalDetails.fullName}&background=random&color=fff&rounded=true&bold=true&size=32`;
    }

    return image;
  }
  onScroll = () => {
    this.pageIndex++;
    this.appendData();
  };
}
