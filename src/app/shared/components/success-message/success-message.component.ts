import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-message.component.html',
  styles: []
})
export class SuccessMessageComponent {
  @Input() title: string = '¡Éxito!';
  @Input() message: string = 'Operación completada exitosamente.';
  @Input() showActionButton: boolean = false;
  @Input() actionButtonText: string = 'Continuar';
  @Input() dismissible: boolean = false;

  @Output() onAction = new EventEmitter<void>();
  @Output() onDismiss = new EventEmitter<void>();
}
