import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesListComponent } from './movie/movie.component';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

import { NavComponent } from './nav/nav.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet ,RouterModule,NavComponent],
  template: `
 
        <router-outlet/>

    `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'films-app';

}
