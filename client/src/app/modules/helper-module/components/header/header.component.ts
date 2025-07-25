
import { Component } from '@angular/core';
import { LucideAngularModule, EllipsisVertical } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  headingName: string;
  iconVisible: boolean = true;
  readonly EllipsisVertical = EllipsisVertical;
  constructor() {
    this.headingName = "Helpers";
  }
}
