import { Component, Input, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatImage } from '../../../core/domain/entities/cat.entity';

@Component({
  selector: 'app-cat-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cat-carousel.component.html',
  styles: [`
    :host {
      display: block;
    }
    
    .transition-transform {
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .backdrop-blur-sm {
      backdrop-filter: blur(4px);
    }
  `]
})
export class CatCarouselComponent implements OnDestroy {
  @Input() images: CatImage[] = [];
  @Input() currentIndex: number = 0;
  @Output() indexChange = new EventEmitter<number>();

  isAutoPlaying: boolean = false;
  private autoPlayInterval: any;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (this.images && this.images.length > 1) {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          this.previous();
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.next();
          break;
        case ' ':
          event.preventDefault();
          this.toggleAutoPlay();
          break;
      }
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  next(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.indexChange.emit(this.currentIndex);
    } else if (this.isAutoPlaying) {
      // Loop al inicio si está en reproducción automática
      this.currentIndex = 0;
      this.indexChange.emit(this.currentIndex);
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.indexChange.emit(this.currentIndex);
    } else if (this.isAutoPlaying) {
      // Loop al final si está en reproducción automática
      this.currentIndex = this.images.length - 1;
      this.indexChange.emit(this.currentIndex);
    }
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.images.length) {
      this.currentIndex = index;
      this.indexChange.emit(this.currentIndex);
    }
  }

  toggleAutoPlay(): void {
    if (this.isAutoPlaying) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  private startAutoPlay(): void {
    this.isAutoPlaying = true;
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 3000); // Cambiar imagen cada 3 segundos
  }

  private stopAutoPlay(): void {
    this.isAutoPlaying = false;
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  onImageError(event: any): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }

  // Gestos táctiles
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private mouseStartX: number = 0;
  private mouseEndX: number = 0;

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  onMouseDown(event: MouseEvent): void {
    this.mouseStartX = event.clientX;
  }

  onMouseUp(event: MouseEvent): void {
    this.mouseEndX = event.clientX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const touchDiff = this.touchEndX - this.touchStartX;
    const mouseDiff = this.mouseEndX - this.mouseStartX;
    const diff = touchDiff !== 0 ? touchDiff : mouseDiff;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.previous();
      } else {
        this.next();
      }
    }
  }
}
