import { Routes } from "@angular/router";
import { MoviesListComponent } from "./movie/movie.component";
import { DetailsMovieComponent } from "./details-movie/details-movie.component";
import { FavoriteComponent } from "./favorite/favorite.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./fire-guards/auth.guard";

export const routes: Routes = [
  {
    path: "home",
    component: MoviesListComponent,
    title: "Movies list",
  },
  {
    path: "",
    component: MoviesListComponent,
    pathMatch: "full",
  },
  {
    path: "detail/:id",
    component: DetailsMovieComponent,
    title: "Movie detail",
  },
  {
    path: "signup",
    component: SignupComponent,
    title: "Signup page",
  },
  { path: "login", component: LoginComponent },
  {
    path: "favorite",
    component: FavoriteComponent,
    title: "Favorite Movies",
    canActivate: [AuthGuard],
  },

{
  path: "**",
  redirectTo: "home",
},



];
