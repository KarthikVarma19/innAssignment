import { Component } from '@angular/core';
import { HelperdataComponent } from './helperdata/helperdata.component';
import { HelperslistComponent } from './helperslist/helperslist.component';

@Component({
  selector: 'app-helperbody',
  standalone: true,
  imports: [HelperdataComponent, HelperslistComponent],
  templateUrl: './helperbody.component.html',
  styleUrl: './helperbody.component.scss'
})
export class HelperbodyComponent {

}
