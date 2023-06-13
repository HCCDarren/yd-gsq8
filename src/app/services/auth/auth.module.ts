import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthSigninPageComponent } from './auth-signin-page/auth-signin-page.component';
import { MatInputModule } from '@angular/material';
import { MaterialModule } from 'src/app/shared/material/material.module';


const authRoutes: Routes = [
  { path: '', component: AuthSigninPageComponent },
  { path: '**', component: AuthSigninPageComponent }
];

@NgModule({
  declarations: [
    AuthSigninPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
