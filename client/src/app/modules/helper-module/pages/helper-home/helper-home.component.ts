import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
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
import { HelperService } from '../../services/helper.service';
import { ExcelService } from '../../services/excel.service';
import { HelperdataComponent } from '../../components/helperdata/helperdata.component';
@Component({
  selector: 'app-helperhome',
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
  templateUrl: './helper-home.component.html',
  styleUrl: './helper-home.component.scss',
})
export class HelperhomeComponent implements OnInit, OnDestroy {
  helpersData: any[];
  filteredHelperData: any[];
  helperDetails: any;
  displayFilteredDateRangeText: string;
  model: { start: Date; end: Date };
  isBrowser: boolean;
  ranges: any;
  showSortBy: boolean = false;
  sortDropDownItems: Array<{ label: string; value: string }>;
  filterOptions: {
    sortby: string;
    serviceTypes: [];
    organizations: [];
    joiningStartDate: Date;
    joiningEndDate: Date;
    searchHelperBasedOnNameEmployeeIdPhone: string;
  };
  typeOfServiceOptions: Array<{ value: string; label: string }>;
  organizationNameOptions: Array<{ value: string; label: string }>;
  pageSize: number;
  pageIndex: number;
  pageSizeOptions: Array<number>;
  isLoading: boolean;
  helpersMetaData: {
    total: number;
    filteredTotal: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  searchInput: Subject<string>;
  helperFilterForm: FormGroup;
  searchText: string;
  showFilterByDropDown: boolean;
  filterBadgeHidden: boolean;
  badgeNumber: number;
  showDatePicker: boolean;
  showNothingFound: boolean;
  showSkeleton: boolean;

  constructor(
    private helperService: HelperService,
    private excelService: ExcelService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.showSkeleton = true;
    this.helpersData = [];
    this.filteredHelperData = [];
    this.displayFilteredDateRangeText = '';
    this.model = { start: new Date(), end: new Date() };
    this.ranges = {
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
    this.sortDropDownItems = [
      {
        label: 'Helpers Name (A-Z)',
        value: 'employeeName',
      },
      {
        label: 'Employee ID',
        value: 'employeeId',
      },
    ];
    this.filterOptions = {
      sortby: 'employeeName',
      serviceTypes: [],
      organizations: [],
      joiningStartDate: new Date('2000-01-01'),
      joiningEndDate: new Date(),
      searchHelperBasedOnNameEmployeeIdPhone: '',
    };
    this.typeOfServiceOptions = [
      { value: 'Maid', label: 'Maid' },
      { value: 'Cook', label: 'Cook' },
      { value: 'Nurse', label: 'Nurse' },
      { value: 'Driver', label: 'Driver' },
    ];
    this.organizationNameOptions = [
      { value: 'ASBL', label: 'ASBL' },
      { value: 'Springs Helpers', label: 'Springs Helpers' },
    ];
    this.helpersMetaData = {
      total: 0,
      filteredTotal: 0,
      page: 0,
      limit: 0,
      totalPages: 0,
    };
    this.pageSize = 100;
    this.pageIndex = 1;
    this.pageSizeOptions = [5, 10, 25, 100];
    this.isLoading = false;
    this.searchInput = new Subject<string>();
    this.searchText = '';
    this.showFilterByDropDown = false;
    this.filterBadgeHidden = true;
    this.badgeNumber = 0;
    this.showDatePicker = false;
    this.helperDetails = {
      context: 'admin',
      data: null,
    };
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.helperFilterForm = this.fb.group({
      typeOfService: [''],
      organizationName: [''],
    });

    this.searchInput.pipe(debounceTime(500)).subscribe((searchTerm: string) => {
      this.searchForHelper(searchTerm);
    });
    this.showNothingFound = false;
  }

  ngOnInit(): void {
    this.pageIndex = 1;
    this.loadInitialData();
  }

  ngOnDestroy() {
    this.searchInput.complete();
  }

  onSearchInputChange() {
    this.searchInput.next(this.searchText);
  }

  getHelperDetails(_helperObjectId: string) {
    if (this.helperDetails.data._id === _helperObjectId) return;
    const foundData = this.helpersData.find(
      (helper) => helper._id === _helperObjectId
    );
    this.helperDetails = {
      ...this.helperDetails,
      data: foundData,
    };
  }

  toggleLoading = () => (this.isLoading = !this.isLoading);
  datePickerClicked(event: Event) {
    event.stopPropagation();
  }
  datesUpdated(event: any) {
    if (!event.startDate || !event.endDate) return;
    const startingDate = dayjs(event.startDate).toDate();
    const endingDate = dayjs(event.endDate).toDate();
    this.filterOptions.joiningStartDate = startingDate;
    this.filterOptions.joiningEndDate = endingDate;
    const displayEndDate = new Date(endingDate.getTime() - 24 * 60 * 60 * 1000);
    const formatedStartDate =
      startingDate.getDate() +
      '/' +
      (startingDate.getMonth() + 1) +
      '/' +
      startingDate.getFullYear().toString().substring(2);
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
  datesCleared() {
    if (this.displayFilteredDateRangeText === '') {
      return;
    }
    this.clearDatesData();
    this.loadInitialData();
  }

  clearDatesData() {
    this.displayFilteredDateRangeText = '';
    this.filterOptions.joiningStartDate = new Date('2000-01-01');
    this.filterOptions.joiningEndDate = new Date();
    this.model = { start: new Date(), end: new Date() };
    this.datesCleared();
    this.cdr.detectChanges();
  }

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

    this.displayFilteredDateRangeText = '';
    this.searchText = '';
    this.loadInitialData();
  }

  sortHelpers(event: Event, property: string) {
    this.filterOptions.sortby = property;
    this.showSortBy = false;
    event.stopPropagation();
    this.loadInitialData();
  }
  toggleSortDropDown(event: Event) {
    this.showFilterByDropDown = false;
    this.showDatePicker = false;
    this.showSortBy = !this.showSortBy;
    event.stopPropagation();
  }

  toggleFilterByDropDown(event: Event) {
    this.showSortBy = false;
    this.showDatePicker = false;
    this.showFilterByDropDown = !this.showFilterByDropDown;
    event.stopPropagation();
  }

  toggleDatePicker(event: Event) {
    this.showSortBy = false;
    this.showFilterByDropDown = false;
    this.showDatePicker = true;
    event.stopPropagation();
  }

  @HostListener('document:click')
  handleClickOutside() {
    if (this.showSortBy) {
      this.showSortBy = false;
    }
    if (this.showFilterByDropDown) {
      this.showFilterByDropDown = false;
    }
    if (this.showDatePicker) {
      this.showDatePicker = false;
    }
  }

  filterContainerDropDown(event: Event) {
    event.stopPropagation();
  }

  filtersReset(event: Event) {
    this.clearFiltersData();
    event.stopPropagation();
    event.preventDefault();
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
      this.loadInitialData();
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
    this.loadInitialData();
  }

  loadInitialData() {
    this.pageSize = 100;
    this.pageIndex = 1;
    this.toggleLoading();
    this.helpersMetaData = {
      total: 0,
      filteredTotal: 0,
      page: 0,
      limit: 0,
      totalPages: 0,
    };
    this.helperService
      .getHelpersPaged(this.pageIndex, this.pageSize, this.filterOptions)
      .subscribe({
        next: (response) => {
          this.helpersData = [...response.data];
          this.helpersMetaData = response.meta;
          this.helperDetails = { data: this.helpersData[0], context: 'admin' };
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.toggleLoading();
          if (this.helpersData.length == 0) {
            this.showNothingFound = true;
          } else {
            this.showNothingFound = false;
          }
        },
      });
    this.cdr.detectChanges();
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

  removeSearchText(): void {
    this.filterOptions.searchHelperBasedOnNameEmployeeIdPhone = '';
    this.searchText = '';
    this.loadInitialData();
  }

  searchForHelper(searchTerm: string): void {
    this.filterOptions.searchHelperBasedOnNameEmployeeIdPhone =
      searchTerm.toLowerCase();
    this.loadInitialData();
  }

  downloadClicked() {
    if (this.showNothingFound) {
      alert('No helpers found to download.');
      return;
    }
    const fileName = 'helpers_data_' + new Date().toISOString() + '.xlsx';
    if (
      confirm('Do You Want to Download the Helpers Data in Excel Sheet Format?')
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
