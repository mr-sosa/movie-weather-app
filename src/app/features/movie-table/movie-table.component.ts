import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie.model';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

// Angular Material Modules
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../../core/layout/footer/footer.component';

@Component({
  selector: 'app-movie-table',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieTableComponent implements OnDestroy {
  private movieService = inject(MovieService);
  private snackBar = inject(MatSnackBar);

  public displayedColumns: string[] = ['poster', 'title', 'release_date', 'vote_average'];
  public dataSource = new MatTableDataSource<Movie>([]);
  public page = signal(1);
  public loading = signal(true);
  public totalResults = signal(0);
  public currentSearchQuery = signal('');

  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  constructor() {
    this.loadMovies();

    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((query: string) => {
        this.page.set(1);
        this.currentSearchQuery.set(query);
        this.loading.set(true);
        if (query) {
          return this.movieService.searchMovies(query, this.page());
        } else {
          return this.movieService.getTrendingMovies(this.page());
        }
      })
    ).subscribe({
      next: response => {
        this.dataSource.data = response.results;
        this.totalResults.set(response.total_results);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.dataSource.data = [];
        this.snackBar.open('Error searching movies.', 'Close', { duration: 3000 });
      }
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  loadMovies() {
    this.loading.set(true);
    const query = this.currentSearchQuery();
    const moviesObservable = query
      ? this.movieService.searchMovies(query, this.page())
      : this.movieService.getTrendingMovies(this.page());

    moviesObservable.subscribe({
      next: (response) => {
        this.dataSource.data = response.results;
        this.totalResults.set(response.total_results);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.dataSource.data = [];
        this.snackBar.open('Error loading movies.', 'Close', { duration: 3000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(filterValue.trim().toLowerCase());
  }

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    this.searchSubject.next('');
  }

  handlePageEvent(event: PageEvent) {
    this.page.set(event.pageIndex + 1);
    this.loadMovies();
  }
}
