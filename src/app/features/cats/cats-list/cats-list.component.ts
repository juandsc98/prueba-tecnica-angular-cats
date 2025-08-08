import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { CatCardComponent } from '../../../shared/components/cat-card/cat-card.component';
import { CatCarouselComponent } from '../cat-carousel/cat-carousel.component';
import { GetCatsUseCase } from '../../../core/domain/usecases/get-cats.usecase';
import { GetCatByIdUseCase } from '../../../core/domain/usecases/get-cat-by-id.usecase';
import { Cat, CatImage } from '../../../core/domain/entities/cat.entity';
import { ICatRepository } from '../../../core/domain/repositories/cat.repository';
import { CAT_REPOSITORY_TOKEN } from '../../../core/infrastructure/providers';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-cats-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ErrorMessageComponent,
    CatCardComponent,
    CatCarouselComponent
  ],
  templateUrl: './cats-list.component.html',
  styles: []
})
export class CatsListComponent implements OnInit {
  breeds: Cat[] = [];
  selectedBreedId: string = '';
  selectedCat: Cat | null = null;
  catImages: CatImage[] = [];
  currentImageIndex: number = 0;
  isLoading: boolean = false;
  isLoadingBreeds: boolean = false;
  errorMessage: string = '';

  constructor(
    private getCatsUseCase: GetCatsUseCase,
    private getCatByIdUseCase: GetCatByIdUseCase,
    @Inject(CAT_REPOSITORY_TOKEN) private catRepository: ICatRepository
  ) {}

  ngOnInit(): void {
    this.loadCats();
  }

  loadCats(): void {
    this.isLoadingBreeds = true;
    this.errorMessage = '';

    // Para la vista detallada, cargamos todas las razas (sin paginación)
    this.getCatsUseCase.execute(1, 100).subscribe({
      next: (response) => {
        this.breeds = response.data;
        this.isLoadingBreeds = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar las razas de gatos. Por favor, intenta de nuevo.';
        this.isLoadingBreeds = false;
      }
    });
  }

  onBreedSelected(): void {
    if (!this.selectedBreedId) {
      this.selectedCat = null;
      this.catImages = [];
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    // Cargar información del gato
    this.getCatByIdUseCase.execute(this.selectedBreedId).subscribe({
      next: (cat) => {
        this.selectedCat = cat;
        this.currentImageIndex = 0;
        
        // Cargar imágenes adicionales del gato
        this.catRepository.getBreedImages(this.selectedBreedId).subscribe({
          next: (images) => {
            this.catImages = images;
            this.isLoading = false;
          },
          error: (error) => {
            // Si falla la carga de imágenes, al menos mostrar la imagen principal
            this.catImages = cat.image ? [cat.image] : [];
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar la información del gato seleccionado.';
        this.isLoading = false;
      }
    });
  }

  onImageIndexChange(index: number): void {
    this.currentImageIndex = index;
  }
}
