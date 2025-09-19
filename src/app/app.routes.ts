import { Routes } from '@angular/router';
import { MovieTableComponent } from './features/movie-table/movie-table.component';

export const routes: Routes = [
  { path: '', component: MovieTableComponent },
  { path: '**', redirectTo: '' }
];
