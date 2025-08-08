import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cat } from '../../../core/domain/entities/cat.entity';
import { CatCardSkeletonComponent } from '../cat-card-skeleton/cat-card-skeleton.component';

@Component({
  selector: 'app-cat-card',
  standalone: true,
  imports: [CommonModule, CatCardSkeletonComponent],
  templateUrl: './cat-card.component.html',
  styles: []
})
export class CatCardComponent {
  @Input() cat!: Cat;
  @Input() isLoading: boolean = false;

  onImageError(event: any) {
    const target = event.target as HTMLImageElement;
    const nextElement = target.nextElementSibling as HTMLElement;
    if (target && nextElement) {
      target.style.display = 'none';
      nextElement.style.display = 'flex';
    }
  }
}
