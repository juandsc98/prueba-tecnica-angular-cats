import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

import { GetCatsUseCase } from '../../../core/domain/usecases/get-cats.usecase';
import { SearchCatsUseCase } from '../../../core/domain/usecases/search-cats.usecase';
import { GetTotalBreedsUseCase } from '../../../core/domain/usecases/get-total-breeds.usecase';
import { Cat } from '../../../core/domain/entities/cat.entity';
import { PaginatedResponse } from '../../../core/domain/repositories/cat.repository';

@Component({
  selector: 'app-cats-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    PaginationComponent
  ],
  templateUrl: './cats-table.component.html',
  styles: []
})
export class CatsTableComponent implements OnInit {
  allCats: Cat[] = [];
  filteredCats: Cat[] = [];
  searchQuery: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  
  // Propiedades de paginación
  currentPage: number = 1;
  totalPages: number = 1;
  total: number = 0;
  pageSize: number = 10;

  constructor(
    private getCatsUseCase: GetCatsUseCase,
    private searchCatsUseCase: SearchCatsUseCase,
    private getTotalBreedsUseCase: GetTotalBreedsUseCase
  ) {}

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Primero obtenemos el total de razas
    this.getTotalBreedsUseCase.execute().subscribe({
      next: (totalBreeds: number) => {
        this.total = totalBreeds;
        this.totalPages = Math.ceil(totalBreeds / this.pageSize);
        
        // Luego cargamos la primera página con el total real
        this.loadCats();
      },
      error: (error) => {
        this.errorMessage = 'Error al obtener el total de razas. Por favor, intenta de nuevo.';
        this.isLoading = false;
        console.error('Error getting total breeds:', error);
      }
    });
  }

  loadCats(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.getCatsUseCase.execute(this.currentPage, this.pageSize, this.total).subscribe({
      next: (response: PaginatedResponse<Cat>) => {
        this.allCats = response.data;
        this.filteredCats = response.data;
        this.isLoading = false;
        
        // Si no hay datos y no estamos en la primera página, volver a la página anterior
        if (response.data.length === 0 && this.currentPage > 1) {
          this.currentPage = this.currentPage - 1;
          this.loadCats();
          return;
        }
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar las razas de gatos. Por favor, intenta de nuevo.';
        this.isLoading = false;
        console.error('Error loading cats:', error);
      }
    });
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.currentPage = 1;
      this.initializeData();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.searchCatsUseCase.execute(this.searchQuery.trim(), this.currentPage, this.pageSize).subscribe({
      next: (response: PaginatedResponse<Cat>) => {
        this.filteredCats = response.data;
        this.total = response.total;
        this.totalPages = response.totalPages;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al buscar razas de gatos. Por favor, intenta de nuevo.';
        this.isLoading = false;
        console.error('Error searching cats:', error);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    
    if (this.searchQuery.trim()) {
      this.onSearch();
    } else {
      this.loadCats();
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.currentPage = 1;
    this.initializeData();
  }

  onImageError(event: any): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }
}
