import { Component, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { MovieService } from '../service/movie.service';
import { Moviesl } from '../model/moviesI';
import { HttpClientModule } from '@angular/common/http';
import { FilmInfoComponent } from '../movie-info/movie-info.component';
import { Subscription } from "rxjs";
import { UsersloginService } from "../service/users.login.service";

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule ,NavComponent,HttpClientModule,FilmInfoComponent],
  template: `
      <div class="bg-dark"  style="height: 100vh;">
        <app-nav></app-nav>
        <div class="container mt-5">
      <div class="row justify-content-center">
       <div class="col" *ngFor="let movie of movies">
      <app-film-info [movie]="movie"></app-film-info>
    </div>
  </div>
</div>

      </div>
  `,
 
  providers:[MovieService]
})
export class FavoriteComponent implements OnInit  {


  userSub: Subscription;
  commentaire = new Comment();
  userMail :string;
  movies :Moviesl[]= [];
  movieIds: number[] = [];
  
  constructor(private movieService: MovieService,  private userLoginService: UsersloginService){

  }
  ngOnInit(): void {

      this.userSub = this.userLoginService.userSubject.subscribe((user) => {
        
        this.userMail=user.email
        console.log(this.userMail)
        this.getFavorites(this.userMail);
      });
  }

  getFavorites(userMail:string){
  this.movieService.getFavorites(userMail).subscribe((response)=>{
      this.movieIds = response;
      this.getMoviesByIds();
    })
  }

  getMoviesByIds() {
    this.movieIds.forEach((id) => {
      this.movieService.getPopularMoviesById(id).subscribe((movie) => {
        this.movies.push(movie);
      });
    });
  }




}
