import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Moviesl } from '../model/moviesI';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-film-info',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, HttpClientModule],
  template: `
  <div class="card shadow p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem; height:30rem ; "  [routerLink]="['/detail/',movie.id]">
      <img [src]="this.getMoviePosterUrl()" class="card-img-top" style="height: 300px; object-fit: cover;">
      <div class="card-body">
        <h2 class="card-title">{{ movie.title }}</h2>
        <p class="card-text"> The original language: {{ movie.original_language}}</p>
        <p class="card-text">The vote average: {{ movie.vote_average }}</p>
      </div>
    </div>
  `,
  styleUrl: './film-info.component.css',
  providers : [MovieService]
})
export class FilmInfoComponent {
  @Input() movie!: Moviesl;
  constructor(private movieService: MovieService) {
  }

  getMoviePosterUrl(): string {
    return this.movieService.getMoviePoster(this.movie.poster_path);
  }
}
