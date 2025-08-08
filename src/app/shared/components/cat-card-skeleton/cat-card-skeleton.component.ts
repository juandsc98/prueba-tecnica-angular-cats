import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-cat-card-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  templateUrl: './cat-card-skeleton.component.html',
  styles: []
})
export class CatCardSkeletonComponent {}
