import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderService } from './modules/helper-module/services/loader.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



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
  title = 'client';
  isLoading$ = this.loaderService.loading$;
  constructor(private loaderService: LoaderService) {}
}
