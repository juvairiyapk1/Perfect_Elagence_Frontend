import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
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
import { FooterComponent } from './components/footer/footer.component';
import { SideNavComponent } from './adminComponent/side-nav/side-nav.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { EmailOtpVerificationComponent } from './components/email-otp-verification/email-otp-verification.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserSideNavComponent } from './userComponents/user-side-nav/user-side-nav.component';
import { ProfileComponent } from './userComponents/profile/profile.component';
import { EditBasicInfoComponent } from './userComponents/editProfile/edit-basic-info/edit-basic-info.component';
import { EditEduProfessionalInfoComponent } from './userComponents/editProfile/edit-edu-professional-info/edit-edu-professional-info.component';
import { EditPhysicaAttributesComponent } from './userComponents/editProfile/edit-physica-attributes/edit-physica-attributes.component';
import { EditLocationContactComponent } from './userComponents/editProfile/edit-location-contact/edit-location-contact.component';
import { EditFamilyDetComponent } from './userComponents/editProfile/edit-family-det/edit-family-det.component';
import { EditBasicPreferenceComponent } from './userComponents/editPartnerPreferance/edit-basic-preference/edit-basic-preference.component';
import { EditEduProfPrefComponent } from './userComponents/editPartnerPreferance/edit-edu-prof-pref/edit-edu-prof-pref.component';
import { PackagesComponent } from './userComponents/packages/packages.component';
import { PackageListComponent } from './adminComponent/package-list/package-list.component';
import { AddPackageModalComponent } from './adminComponent/add-package-modal/add-package-modal.component';
import { PaymentComponent } from './components/stripe/payment/payment.component'
import { NgxStripeModule } from 'ngx-stripe';
import { CancelComponent } from './components/stripe/cancel/cancel.component';
import { SucessComponent } from './components/stripe/sucess/sucess.component';
import { env } from './model/enviornment';
import { DashComponent } from './adminComponent/dash/dash.component';
import { CardComponent } from './adminComponent/card/card.component';
import { AnnualSubscriptionChartComponent } from './adminComponent/annual-subscription-chart/annual-subscription-chart.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables, } from 'ng2-charts';
import { BarController, Colors, Legend } from 'chart.js';
import { AuthInterceptor } from './auth.interceptor';
import { SubscribersListComponent } from './adminComponent/subscribers-list/subscribers-list.component';


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
    FooterComponent,
    SideNavComponent,
    VerifyEmailComponent,
    EmailOtpVerificationComponent,
    ChangePasswordComponent,
    UserSideNavComponent,
    ProfileComponent,
    EditBasicInfoComponent,
    EditEduProfessionalInfoComponent,
    EditPhysicaAttributesComponent,
    EditLocationContactComponent,
    EditFamilyDetComponent,
    EditBasicPreferenceComponent,
    EditEduProfPrefComponent,
    PackagesComponent,
    PackageListComponent,
    AddPackageModalComponent,
    PaymentComponent,
    CancelComponent,
    SucessComponent,
    DashComponent,
    CardComponent,
    AnnualSubscriptionChartComponent,
    SubscribersListComponent,
    
    
    
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
    NgxStripeModule.forRoot(env.stripe), 
    BaseChartDirective,
    
  

  ],
  
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideToastr(),
    provideNativeDateAdapter(),
    provideCharts(withDefaultRegisterables()),
    provideCharts({ registerables: [BarController, Legend, Colors] }),
    // provideHttpClient(withInterceptors([AuthInterceptor]))  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
