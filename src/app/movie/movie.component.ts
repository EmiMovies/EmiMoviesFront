import { Component, NO_ERRORS_SCHEMA, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Moviesl } from '../model/moviesI';
import { FilmInfoComponent } from '../movie-info/movie-info.component';
import { MovieService } from '../service/movie.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from '../nav/nav.component';


@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule,FilmInfoComponent, HttpClientModule,NavComponent],
  template: `
  <div class="bg-dark"  style="height: max-height;">
      <app-nav/>
  <div class="input-group  m-8 p-6" style="width: 20rem;margin-left:35rem;" >
      <input type="search" class="form-control rounded bg-light-subtle" #filter placeholder="Search"   />
      <button type="button" style="color: white; box-shadow: 2px; background-color:red ; margin-left:10px ; border-radius:4px" class="btn  " (click)="filterMovies(filter.value)" data-mdb-ripple-init>search</button>
  </div>
 <div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col" *ngFor="let movie of moviesFilteredList">
      <app-film-info [movie]="movie"></app-film-info>
    </div>
  </div>
</div>
</div>
 `,
  styleUrl: './movies-list.component.css',
  providers : [MovieService]
})

export class MoviesListComponent {
    moviesList : Moviesl[]; 
    moviesFilteredList !: Moviesl[];
    private movieService : MovieService = inject(MovieService);


    constructor(){
      this.movieService.getPopularMovies().subscribe((reponse =>{
        this.moviesList = reponse.results
        this.moviesFilteredList = this.moviesList;
      }))
    }

       filterMovies(text: string) {
      if (!text) {
        this.moviesFilteredList = this.moviesList;
        return;
      }
      this.movieService.searchMovies(text).subscribe((response) => {
        this.moviesFilteredList = response;
      });
    }
}
