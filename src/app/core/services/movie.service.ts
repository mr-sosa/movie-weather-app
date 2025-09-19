import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieResponse } from '../models/movie.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);
  private apiKey = environment.tmdbApiKey;
  private apiUrl = 'https://api.themoviedb.org/3';

  getTrendingMovies(page: number): Observable<MovieResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.apiKey}`);
    const params = new HttpParams().set('page', page.toString());

    return this.http.get<MovieResponse>(`${this.apiUrl}/trending/movie/day`, { headers, params }).pipe(
      catchError(this.handleError<MovieResponse>('getTrendingMovies', { results: [], page: 0, total_pages: 0, total_results: 0 }))
    );
  }

  searchMovies(query: string, page: number): Observable<MovieResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.apiKey}`);
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString());

    return this.http.get<MovieResponse>(`${this.apiUrl}/search/movie`, { headers, params }).pipe(
      catchError(this.handleError<MovieResponse>('searchMovies', { results: [], page: 0, total_pages: 0, total_results: 0 }))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
