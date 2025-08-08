import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatImage } from '../../../core/domain/entities/cat.entity';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <!-- Imagen Principal -->
      <div class="relative overflow-hidden rounded-lg">
        <img 
          *ngIf="images[currentIndex]?.url" 
          [src]="images[currentIndex].url" 
          [alt]="'Imagen ' + (currentIndex + 1)"
          class="w-full h-64 md:h-80 object-cover"
          (error)="onImageError($event)"
        />
        <div *ngIf="!images[currentIndex]?.url" class="w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center">
          <span class="text-gray-500">Sin imagen</span>
        </div>
        
        <!-- Contador de imágenes -->
        <div class="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>

      <!-- Botones de navegación -->
      <div *ngIf="images.length > 1" class="absolute inset-0 flex items-center justify-between p-4">
        <button 
          (click)="previous()"
          class="bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
          [disabled]="currentIndex === 0"
        >
          <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button 
          (click)="next()"
          class="bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
          [disabled]="currentIndex === images.length - 1"
        >
          <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <!-- Indicadores -->
      <div *ngIf="images.length > 1" class="flex justify-center mt-4 space-x-2">
        <button 
          *ngFor="let image of images; let i = index"
          (click)="goTo(i)"
          class="w-3 h-3 rounded-full transition-all duration-200"
          [class]="i === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'"
        ></button>
      </div>
    </div>
  `,
  styles: []
})
export class ImageCarouselComponent {
  @Input() images: CatImage[] = [];
  @Input() currentIndex: number = 0;
  @Output() indexChange = new EventEmitter<number>();

  next(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.indexChange.emit(this.currentIndex);
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.indexChange.emit(this.currentIndex);
    }
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.images.length) {
      this.currentIndex = index;
      this.indexChange.emit(this.currentIndex);
    }
  }

  onImageError(event: any): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }
}
