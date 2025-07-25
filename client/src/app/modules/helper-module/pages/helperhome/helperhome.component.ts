import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { HelperbodyComponent } from '../../components/helperbody/helperbody.component';

@Component({
  selector: 'app-helperhome',
  standalone: true,
  imports: [HeaderComponent, FiltersComponent, HelperbodyComponent],
  templateUrl: './helperhome.component.html',
  styleUrl: './helperhome.component.scss'
})
export class HelperhomeComponent {

}
