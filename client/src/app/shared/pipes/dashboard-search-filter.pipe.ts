import { Pipe, PipeTransform } from '@angular/core';
import { Dashboard } from '../components/dashboard/dashboard.component';

@Pipe({
  name: 'dashboardSearchFilter',
  standalone: true
})
export class DashboardSearchFilterPipe implements PipeTransform {
  transform(value: Dashboard[], searchValue: string): Dashboard[] {
    const result: Dashboard[] = value.filter((eachHeading) => eachHeading.heading.toLowerCase().includes(searchValue.toLowerCase()));
    return result;
  }
}
