import { Observable } from 'rxjs';
import { Cat, CatImage } from '../entities/cat.entity';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ICatRepository {
  getBreeds(page?: number, limit?: number, totalBreeds?: number): Observable<PaginatedResponse<Cat>>;
  getBreedById(id: string): Observable<Cat>;
  getBreedImages(breedId: string): Observable<CatImage[]>;
  searchBreeds(query: string, page?: number, limit?: number): Observable<PaginatedResponse<Cat>>;
  getTotalBreeds(): Observable<number>;
}
