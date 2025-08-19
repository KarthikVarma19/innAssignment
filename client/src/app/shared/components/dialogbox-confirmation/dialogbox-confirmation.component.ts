import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialogbox-confirmation',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dialogbox-confirmation.component.html',
  styleUrl: './dialogbox-confirmation.component.scss',
})
export class DialogboxConfirmationComponent {
  close() {}
  cancelButtonClicked() {}
  confirmButtonClicked() {}
  @Input() data!: {
    logo: string;
    confirmationType: string;
    confirmationDescription: string;
    confirmationWarning: string;
  };
}
