import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogbox-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialogbox-message.component.html',
  styleUrl: './dialogbox-message.component.scss',
})
export class DialogboxMessageComponent {
  @Input() componentHeading!: string;
  @Input() messageLogo!: string;
  @Input() message!: string;
  close: () => void = () => {};
}
