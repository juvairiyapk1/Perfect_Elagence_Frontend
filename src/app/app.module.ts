import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {  provideToastr } from 'ngx-toastr';
import { provideNativeDateAdapter } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './state/auth.reducer';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { Register1Component } from './components/register1/register1.component';
import { LoginComponent } from './components/login/login.component';
import { CoverPageComponent } from './components/cover-page/cover-page.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserListComponent } from './adminComponent/UserList/user-list/user-list.component';
import { HomeComponent } from './userComponents/home/home.component';
import { AdminDashboardComponent } from './adminComponent/admin-dashboard/admin-dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideNavComponent } from './adminComponent/side-nav/side-nav.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { EmailOtpVerificationComponent } from './components/email-otp-verification/email-otp-verification.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserEditComponent } from './adminComponent/UserList/user-edit/user-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    Register1Component,
    LoginComponent,
    CoverPageComponent,
    OtpVerificationComponent,
    NavbarComponent,
    UserListComponent,
    HomeComponent,
    AdminDashboardComponent,
    FooterComponent,
    SideNavComponent,
    VerifyEmailComponent,
    EmailOtpVerificationComponent,
    ChangePasswordComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserModule,
    StoreModule.forRoot({auth: authReducer}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),  
  ],
  
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideToastr(),
    provideNativeDateAdapter()
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
