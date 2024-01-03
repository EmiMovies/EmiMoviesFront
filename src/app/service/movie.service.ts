import { Injectable } from '@angular/core';
import { Moviesl } from '../model/moviesI';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Comment } from '../model/comment';




@Injectable()

export class MovieService {

  constructor(private http: HttpClient) { }

  baseurl = "https://api.themoviedb.org/3/movie/popular";
  apikey = "0b63e934c7a4c60f03795cad42826d80";
  backendUrl= "http://localhost:8080";
  isLogged:boolean=false;



  getPopularMoviesById(id: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apikey}`;
    return this.http.get<any>(url);
    console.log(url)
  }
 
  searchMovies(moviePrefix: string): Observable<any> {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&language=en-US&query=${moviePrefix}%20&page=1&include_adult=true`
    return this.http.get<any>(url).pipe(map((res: any) => res.results))
  }

  getPopularMovies(): Observable<any> {
  const url = 'https://api.themoviedb.org/3/movie/popular?api_key=' + this.apikey;
  return this.http.get<any>(url);
      }
  removeFavoriteMovie( userMail:string,filmId:number): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}/delete/${userMail}/${filmId}`);
      }


  /*removeFavoriteMovie(movieData: any): Observable<any> {
    const { userMail, filmId } = movieData;
    return this.http.delete<any>(`${this.backendUrl}/delete/${userMail}/${filmId}`);
} */
    
  getMoviePoster(posterPath: string): string {
  return 'https://image.tmdb.org/t/p/w300' + posterPath;
  }

  getMovieDetails(movieId: string): Observable<Moviesl> {
  const url = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + this.apikey;
  return this.http.get<Moviesl>(url);
  }
  addToFavorite(movieData : any): Observable<any> {
    const url = `${this.backendUrl}/favorites`;
    const body =  movieData ;
    console.log(movieData);
    return this.http.post(url, body);
  }
  delFromFavorites(movieData:any):Observable<any>{
    const url = `${this.backendUrl}/delete`;
    const body =  movieData ;
    console.log(movieData);
    return this.http.post(url, body);
  }

  getFavorites(userMail:string):Observable<number[]>{
    return this.http.get<number[]>(`${this.backendUrl}/favFilms/${userMail}`);
  }

  registerUser(userData: User): Observable<any> {
    return this.http.post(`${this.backendUrl}/register`, userData);
  }
  logInUser(loginData :any): Observable<any>{
    this.isLogged=true;
    return this.http.post(`${this.backendUrl}/login`,loginData);
  }

  addComment(commentData: Comment): Observable<any> {
    return this.http.post(`${this.backendUrl}/comment`, commentData);
  }

  getComments(movieId : number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.backendUrl}/comments/${movieId}`);
  }
}
