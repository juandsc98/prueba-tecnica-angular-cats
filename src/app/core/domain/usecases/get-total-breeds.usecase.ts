import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatApiService } from '../../infrastructure/services/cat-api.service';

@Injectable({
  providedIn: 'root'
})
export class GetTotalBreedsUseCase {
  constructor(private catRepository: CatApiService) {}

  execute(): Observable<number> {
    return this.catRepository.getTotalBreeds();
  }
}
