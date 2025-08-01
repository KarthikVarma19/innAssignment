import { Component } from '@angular/core';
import { HelperformComponent } from '../../components/helperform/helperform.component';

@Component({
  selector: 'app-edit-helper',
  standalone: true,
  imports: [HelperformComponent],
  templateUrl: './edit-helper.component.html',
  styleUrl: './edit-helper.component.scss',
})
export class EditHelperComponent {}
