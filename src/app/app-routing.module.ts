import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CoverPageComponent } from './components/cover-page/cover-page.component';
import { Register1Component } from './components/register1/register1.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { HomeComponent } from './userComponents/home/home.component';
import { UserListComponent } from './adminComponent/UserList/user-list/user-list.component';
import { SideNavComponent } from './adminComponent/side-nav/side-nav.component';
import { UserSideNavComponent } from './userComponents/user-side-nav/user-side-nav.component';
import { ProfileComponent } from './userComponents/profile/profile.component';
import { PackagesComponent } from './userComponents/packages/packages.component';
import { PackageListComponent } from './adminComponent/package-list/package-list.component';
import { CancelComponent } from './components/stripe/cancel/cancel.component';
import { SucessComponent } from './components/stripe/sucess/sucess.component';
import { DashComponent } from './adminComponent/dash/dash.component';
import { SubscribersListComponent } from './adminComponent/subscribers-list/subscribers-list.component';
import { authGuard } from './gurd/auth.guard';



const routes: Routes = [
 {path:'',redirectTo:'coverPage',pathMatch:'full'},
 { path: 'coverPage', component: CoverPageComponent },
 { path: 'register1', component: Register1Component },
 { path: 'otp_verify', component: OtpVerificationComponent, },
 { path: 'admin',
   component:SideNavComponent,
   canActivate:[authGuard],
  children:[
    { path: 'dashboard', component: DashComponent },
    {path:'user_list',component:UserListComponent},
    {path:'package_list',component:PackageListComponent},
    {path:'subscribers',component:SubscribersListComponent}
  ]},

 
 {path:'user',
  component:UserSideNavComponent,
  canActivate:[authGuard],
  children:[
  { path: 'home', component: HomeComponent },
  {path:'profile',component:ProfileComponent},
  {path:'package',component:PackagesComponent},
  {path:'cancel',component:CancelComponent},
  {path:'success',component:SucessComponent},
  
 ]},
 
 {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
