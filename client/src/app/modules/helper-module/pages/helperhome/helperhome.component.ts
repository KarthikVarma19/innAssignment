import { Component } from '@angular/core';
import { HelperbodyComponent } from '../../components/helperbody/helperbody.component';

@Component({
  selector: 'app-helperhome',
  standalone: true,
  imports: [HelperbodyComponent],
  templateUrl: './helperhome.component.html',
  styleUrl: './helperhome.component.scss'
})
export class HelperhomeComponent {

}
