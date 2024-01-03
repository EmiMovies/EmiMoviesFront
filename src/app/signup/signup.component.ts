import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and other necessary modules
import { UsersloginService } from '../service/users.login.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,MatIconModule,RouterLink],
  template: `
  <div class="bg-dark" style="height: 100vh;">
    <div style="color: red; font-weight: bolder; font-size: 32px; padding: 10px">EMI MOVIES</div>
    <div class="row d-flex justify-content-center align-items-center h-100 ">
  
      <div class="col-12 col-md-9 col-lg-7 col-xl-6">
     
       
        <div class="card" style="border-radius: 15px;">
          <button style=" width:max-content;  position: absolute;right: 0;top: 4px;border:0;background-color:white;border-radius: 45%;" [routerLink]="['/home']">
            <mat-icon>highlight_off</mat-icon>
          </button>
          <div class="card-body p-5">
            
            <h2 class="text-uppercase text-center mb-5">Create an account</h2>
            <div class="error-message text-center" style="font-weight: bold; color: red;font-size: 20px;" *ngIf="error">
              {{ error }}
            </div>
            
            
  
            <form (ngSubmit)="onSubmitSignUp()" [formGroup]="signUpForm">
  
              
              <div class="form-outline mb-4">
                <div style="display: flex;">
                  <label class="form-label"for="form3Example3cg">Your Email</label>
                  <div
                class="error-message d-flex justify-content-center align-items-center"
                *ngIf="
                    signUpForm.get('email').hasError('email') &&
                    signUpForm.get('email').touched
                "
                style="color: red; padding-left:123px; padding-bottom:10px"
                >
                Invalid email format !
                </div>
                </div>
               
  
                <input type="email" id="form3Example3cg" class="form-control form-control-lg" formControlName="email" required />
              </div>
             
  
              <div class="form-outline mb-4">
                <div style="display: flex;">
                   <label class="form-label" for="form3Example4cg">Password</label>
                 
            </div>
               
                <input type="password" id="form3Example4cg" class="form-control form-control-lg" formControlName="password" />
        
              </div>
              <div
                    class="error-message"
                    style="color: aliceblue !important"
                    *ngIf="
                        signUpForm.get('password').hasError('required') &&
                        signUpForm.get('password').touched
                        "
                        style="color: red;"
                 >
                    Password is required !
               </div>
               <div
                class="error-message"
                style="color: aliceblue !important"
                *ngIf="
                  signUpForm.get('password').hasError('minlength') &&
                  signUpForm.get('password').touched
                "
                style="color: red;padding-left:123px; padding-bottom:10px"
                 >
                  At least 6 characters long !
                  </div>
              
  
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-danger btn-block btn-lg gradient-custom-4 text-body" [disabled]="signUpForm.invalid">Register</button>
              </div>
  
              <p class="text-center text-muted mt-5 mb-0">Have already an account? <a [routerLink]="['/login']" class="fw-bold text-body"><u>Login here</u></a></p>
  
            </form>
  
          </div>
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpForm: FormGroup;
  authFailed: boolean = false;
  error: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersloginService,
    private router: Router
  ) {

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmitSignUp() {
    this.submitForm();
  }
  onHandleError() {
    this.error = null;
  }
  private submitForm() {
    const formGroup = this.signUpForm;

    if (formGroup.invalid) {
      return;
    }

    const formData = formGroup.value;
    const authObservable = this.usersService.signUp(
      formData.email,
      formData.password
    );

    authObservable.subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        this.error = err;

        console.log(err);
      },
    });
    formGroup.reset();
  }
  onSignin() {
    this.router.navigate(['/login']);
  }
}
