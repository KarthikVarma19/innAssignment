import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { LoaderService } from './modules/helper-module/services/loader.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    AsyncPipe,
    MatProgressBarModule,
    NgxSkeletonLoaderModule,
    DashboardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading$ = this.loaderService.loading$;
  constructor(private loaderService: LoaderService) {}
}
