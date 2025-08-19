import { CommonModule, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialogbox-message',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './dialogbox-message.component.html',
  styleUrl: './dialogbox-message.component.scss',
})
export class DialogboxMessageComponent {
  @Input() message!: {
    dialogHeading: string;
    success: boolean;
    contextData: string;
    status: string;
    logo: string;
  };
  close: () => void = () => {};
  id: any;

  ngOnInit(): void {
    this.id = setTimeout(() => {
      this.close();
    }, 1500);
  }
}
