import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from '../entities/cat.entity';
import { ICatRepository } from '../repositories/cat.repository';
import { CAT_REPOSITORY_TOKEN } from '../../infrastructure/providers';

@Injectable({
  providedIn: 'root'
})
export class GetCatByIdUseCase {
  constructor(@Inject(CAT_REPOSITORY_TOKEN) private catRepository: ICatRepository) {}

  execute(id: string): Observable<Cat> {
    return this.catRepository.getBreedById(id);
  }
}
