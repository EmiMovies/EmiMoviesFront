import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { UsersloginService } from '../service/users.login.service';
import { Router, RouterLink } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink,MatIconModule],
  template: `
  <div class="bg-dark" style="height: 100vh;">
      <div style="color: red; font-weight: bolder; font-size: 32px; padding: 10px">EMI MOVIES</div>
      <div class="row d-flex justify-content-center align-items-center h-100 ">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <button style=" width:max-content;  position: absolute;right: 0;top: 4px;border:0;background-color:white;border-radius: 45%;" [routerLink]="['/home']">
                <mat-icon>highlight_off</mat-icon>
              </button>
              <h2 class="text-uppercase text-center mb-5">Log In</h2>
              <div class="error-message text-center" style="font-weight: bold; color: red;font-size: 20px;" *ngIf="error">
                {{ error }}
              </div>
              
                     
              <form (ngSubmit)="onSubmitLogin()" [formGroup]="loginForm">
                <div class="form-outline mb-4">
                  <span *ngIf="!error" style="color: red;" class="  d-flex justify-content-center align-items-center ;font-size: 16px;">Fill All The Fields</span>
                  <br>
                  <label class="form-label" for="form3Example1cg">Your Email</label>
                  <input type="email" id="form3Example1cg" class="form-control form-control-lg"  formControlName="email" />
                  <div
                  class="error-message"
                  *ngIf="
                    loginForm.get('email').hasError('email') &&
                    loginForm.get('email').touched
                  "
                >
                  Invalid email format.
                </div>
                  
                </div>
  
                <div class="form-outline mb-4">
                    <label class="form-label" for="form3Example4cg">Password</label>
                  <input type="password" id="form3Example4cg" class="form-control form-control-lg"  formControlName="password" />
                 
                </div>
                <div
                class="error-message"
                *ngIf="
                  loginForm.get('password').hasError('required') &&
                  loginForm.get('password').touched
                "
              >
                Password is required.
              </div>
  
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-danger btn-block btn-lg gradient-custom-4 text-body" [disabled]="loginForm.invalid">Log In</button>
                </div>
  
                <p class="text-center text-muted mt-5 mb-0">You don't have an account? <a [routerLink]="['/signup']" class="fw-bold text-body"><u>Sign up here</u></a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

})
export class LoginComponent {
  loginForm: FormGroup;
  authFailed: boolean = false;
  error: string = null;
  constructor(
    private formBuilder: FormBuilder,

    private router: Router,
    private usersService: UsersloginService
  ) {


    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmitLogin() {
    this.submitForm();
  }

  onHandleError() {
    this.error = null;
  }

  private submitForm() {
    const formGroup = this.loginForm;

    if (formGroup.invalid) {
      return;
    }

    const formData = formGroup.value;
    const authObservable = this.usersService.login(
      formData.email,
      formData.password
    );

    authObservable.subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
        console.log(response);
      },
      error: (err) => {
        this.error = err;

        console.log(err);
      },
    });
    formGroup.reset();
  }
 
}
