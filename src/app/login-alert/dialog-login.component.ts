import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dialog-login',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MatIconModule],
  template: `<h2 mat-dialog-title>You should be logged-In !</h2>
  <button mat-button mat-dialog-close class="mat-raised-button mat-button-lg" style="   position: absolute;right: 0;top: 4px; background-color:white;border-radius: 25%;" >
    <mat-icon>highlight_off</mat-icon>
  </button>
  <mat-dialog-content class="mat-typography">
    <p>You can get this feature  by signing up or logging in.</p>
  </mat-dialog-content>
  <mat-dialog-actions align="center">
  
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial class="mat-raised-button mat-button-lg custom-button" style="background-color: red;">Log In</button>
  </mat-dialog-actions>
  `,
 
})
export class LoginALertComponent {}
