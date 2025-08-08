import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.component.html',
  styles: []
})
export class SkeletonComponent {
  @Input() type: 'text' | 'title' | 'image' | 'avatar' = 'text';
  @Input() width: string = '100%';
}
