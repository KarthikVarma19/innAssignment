import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { HelperhomeComponent } from './modules/helper-module/pages/helperhome/helperhome.component';
import { AddhelperComponent } from './modules/helper-module/pages/addhelper/addhelper.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent, HelperhomeComponent, AddhelperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'

})
export class AppComponent {
  title = 'client';
}
