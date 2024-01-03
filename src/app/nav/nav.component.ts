import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsersloginService } from '../service/users.login.service'; 
import { Subscription } from 'rxjs';
@Component({
  selector: "app-nav",
  standalone: true,
  imports: [CommonModule],
  template: `
  <nav class="navbar justify-content-between" style="margin-bottom: 60px; padding-left:12px; padding-right:12px; padding-top:12px;background: black ;width:full;height:48px">
  <a class="nav-link" style="color:red; font-weight: bold; font-size: 18px;" (click)="toHome()">
    <button  style="color:red; font-weight: bold; font-size: 24px;background:black;border:0">EMi Movies</button>
  </a>
  <div style="display:flex; gap:24px;">
    <a *ngIf="isAuthenticated" class="nav-link" style="color:red; font-weight: bold; font-size: 18px;cursor: pointer;" (click)="onClick()">Fav Movies</a>
    <a *ngIf="isAuthenticated" class="nav-link" style="color:red; font-weight: bold; font-size: 18px;cursor: pointer;" (click)="onLogout()">Logout</a>
    <a *ngIf="!isAuthenticated" class="nav-link" style="color:red; font-weight: bold; font-size: 18px;cursor: pointer;" (click)="onLogin()">SignIn</a>
  </div>
</nav>

  `,
  styleUrl: "./nav.component.css",
})
export class NavComponent {
  isAuthenticated = false;
  userSub: Subscription;
  constructor(
    private router: Router,
    private userLoginService: UsersloginService
  ) {}

  ngOnInit() {
    this.userSub = this.userLoginService.userSubject.subscribe((user) => {
      console.log("user", user);
      this.isAuthenticated = !!user;
    });
  }
  onLogout() {
    this.userLoginService.logout();
  }
  onLogin() {
    this.router.navigate(["/login"]);
  }
  onClick(){
    this.router.navigate(['/favorite'])
  }
  toHome(){
    this.router.navigate(['/list'])
  }
}
