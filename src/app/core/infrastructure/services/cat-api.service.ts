import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Cat, CatImage } from '../../domain/entities/cat.entity';
import { ICatRepository, PaginatedResponse } from '../../domain/repositories/cat.repository';

@Injectable({
  providedIn: 'root'
})
export class CatApiService implements ICatRepository {
  private readonly baseUrl = 'https://api.thecatapi.com/v1';
  private readonly apiKey = 'live_ihFpkMlAVvqqSYJeI3tsBLFxvvjf89fmdqoidDSlg02gdj74j7sTXxe8yMtewo4f';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json'
    });
  }

  getBreeds(page: number = 1, limit: number = 10, totalBreeds?: number): Observable<PaginatedResponse<Cat>> {
    // Ajustar la página para la API: page=0 es la primera página, page=1 es la segunda, etc.
    const apiPage = page - 1;
    const offset = page * limit;
    return this.http.get<any[]>(`${this.baseUrl}/breeds?limit=${limit}&page=${apiPage}`, { headers: this.getHeaders() }).pipe(
      map(breeds => {
        const cats = breeds.map(breed => this.mapToCat(breed));
        
        // Si no hay datos, significa que hemos llegado al final
        if (cats.length === 0) {
          return {
            data: [],
            total: totalBreeds || (page - 1) * limit,
            page: page,
            limit: limit,
            totalPages: Math.max(1, page - 1)
          };
        }
        
        // Si tenemos el total real, usarlo para calcular las páginas
        if (totalBreeds) {
          return {
            data: cats,
            total: totalBreeds,
            page: page,
            limit: limit,
            totalPages: Math.ceil(totalBreeds / limit)
          };
        }
        
        // Fallback: si no tenemos el total, estimamos basado en los datos actuales
        if (cats.length < limit) {
          const total = (page - 1) * limit + cats.length;
          return {
            data: cats,
            total: total,
            page: page,
            limit: limit,
            totalPages: page
          };
        }
        
        // Si tenemos el límite completo, estimamos que hay más páginas
        const estimatedTotal = page * limit + cats.length;
        const totalPages = page + 1;
        
        return {
          data: cats,
          total: estimatedTotal,
          page: page,
          limit: limit,
          totalPages: totalPages
        };
      })
    );
  }

  // Nuevo método para obtener el total de razas
  getTotalBreeds(): Observable<number> {
    return this.http.get<any[]>(`${this.baseUrl}/breeds?limit=100`, { headers: this.getHeaders() }).pipe(
      map(breeds => breeds.length)
    );
  }

  getBreedById(id: string): Observable<Cat> {
    return this.http.get<any>(`${this.baseUrl}/breeds/${id}`, { headers: this.getHeaders() }).pipe(
      map(breed => this.mapToCat(breed))
    );
  }

  getBreedImages(breedId: string): Observable<CatImage[]> {
    return this.http.get<any[]>(`${this.baseUrl}/images/search?breed_ids=${breedId}&limit=10&size=full`, { headers: this.getHeaders() }).pipe(
      map(images => images.map(image => ({
        id: image.id,
        url: image.url,
        width: image.width,
        height: image.height
      })))
    );
  }

  searchBreeds(query: string, page: number = 1, limit: number = 10): Observable<PaginatedResponse<Cat>> {
    // Ajustar la página para la API: page=0 es la primera página, page=1 es la segunda, etc.
    const apiPage = page - 1;
    const offset = page * limit;
    return this.http.get<any[]>(`${this.baseUrl}/breeds/search?q=${query}&limit=${limit}&page=${apiPage}`, { headers: this.getHeaders() }).pipe(
      map(breeds => {
        const cats = breeds.map(breed => this.mapToCat(breed));
        return {
          data: cats,
          total: cats.length, // Para búsquedas, usamos el número real de resultados
          page: page,
          limit: limit,
          totalPages: Math.ceil(cats.length / limit)
        };
      })
    );
  }

  private mapToCat(breed: any): Cat {
    return {
      id: breed.id,
      name: breed.name,
      temperament: breed.temperament || '',
      origin: breed.origin || '',
      description: breed.description || '',
      life_span: breed.life_span || '',
      adaptability: breed.adaptability || 0,
      affection_level: breed.affection_level || 0,
      child_friendly: breed.child_friendly || 0,
      dog_friendly: breed.dog_friendly || 0,
      energy_level: breed.energy_level || 0,
      grooming: breed.grooming || 0,
      health_issues: breed.health_issues || 0,
      intelligence: breed.intelligence || 0,
      shedding_level: breed.shedding_level || 0,
      social_needs: breed.social_needs || 0,
      stranger_friendly: breed.stranger_friendly || 0,
      vocalisation: breed.vocalisation || 0,
      experimental: breed.experimental || 0,
      hairless: breed.hairless || 0,
      natural: breed.natural || 0,
      rare: breed.rare || 0,
      rex: breed.rex || 0,
      suppressed_tail: breed.suppressed_tail || 0,
      short_legs: breed.short_legs || 0,
      wikipedia_url: breed.wikipedia_url || '',
      hypoallergenic: breed.hypoallergenic || 0,
      reference_image_id: breed.reference_image_id || '',
      image: breed.image ? {
        id: breed.image.id,
        url: breed.image.url,
        width: breed.image.width,
        height: breed.image.height
      } : undefined
    };
  }

  private mapImageToCat(image: any): Cat {
    return {
      id: image.breeds?.[0]?.id || image.id,
      name: image.breeds?.[0]?.name || 'Unknown',
      temperament: image.breeds?.[0]?.temperament || '',
      origin: image.breeds?.[0]?.origin || '',
      description: image.breeds?.[0]?.description || '',
      life_span: image.breeds?.[0]?.life_span || '',
      adaptability: image.breeds?.[0]?.adaptability || 0,
      affection_level: image.breeds?.[0]?.affection_level || 0,
      child_friendly: image.breeds?.[0]?.child_friendly || 0,
      dog_friendly: image.breeds?.[0]?.dog_friendly || 0,
      energy_level: image.breeds?.[0]?.energy_level || 0,
      grooming: image.breeds?.[0]?.grooming || 0,
      health_issues: image.breeds?.[0]?.health_issues || 0,
      intelligence: image.breeds?.[0]?.intelligence || 0,
      shedding_level: image.breeds?.[0]?.shedding_level || 0,
      social_needs: image.breeds?.[0]?.social_needs || 0,
      stranger_friendly: image.breeds?.[0]?.stranger_friendly || 0,
      vocalisation: image.breeds?.[0]?.vocalisation || 0,
      experimental: image.breeds?.[0]?.experimental || 0,
      hairless: image.breeds?.[0]?.hairless || 0,
      natural: image.breeds?.[0]?.natural || 0,
      rare: image.breeds?.[0]?.rare || 0,
      rex: image.breeds?.[0]?.rex || 0,
      suppressed_tail: image.breeds?.[0]?.suppressed_tail || 0,
      short_legs: image.breeds?.[0]?.short_legs || 0,
      wikipedia_url: image.breeds?.[0]?.wikipedia_url || '',
      hypoallergenic: image.breeds?.[0]?.hypoallergenic || 0,
      reference_image_id: image.breeds?.[0]?.reference_image_id || '',
      image: {
        id: image.id,
        url: image.url,
        width: image.width,
        height: image.height
      }
    };
  }
}
