import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styles: []
})
export class ErrorMessageComponent {
  @Input() message: string = '';
  @Input() showRetry: boolean = true;
  @Output() onRetry = new EventEmitter<void>();
}
