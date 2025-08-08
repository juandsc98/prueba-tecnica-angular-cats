import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from '../entities/cat.entity';
import { ICatRepository, PaginatedResponse } from '../repositories/cat.repository';
import { CAT_REPOSITORY_TOKEN } from '../../infrastructure/providers';

@Injectable({
  providedIn: 'root'
})
export class SearchCatsUseCase {
  constructor(@Inject(CAT_REPOSITORY_TOKEN) private catRepository: ICatRepository) {}

  execute(query: string, page?: number, limit?: number): Observable<PaginatedResponse<Cat>> {
    return this.catRepository.searchBreeds(query, page, limit);
  }
}
