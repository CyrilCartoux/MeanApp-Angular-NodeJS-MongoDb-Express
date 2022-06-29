import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from './../material/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AuthRoutingModule
    ],
    exports: [
        LoginComponent,
        SignupComponent
    ]
})

export class AuthModule { }
