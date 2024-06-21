import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CoverPageComponent } from './components/cover-page/cover-page.component';
import { Register1Component } from './components/register1/register1.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { HomeComponent } from './userComponents/home/home.component';
import { AdminDashboardComponent } from './adminComponent/admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './adminComponent/UserList/user-list/user-list.component';
import { authGuard } from './gurd/auth.guard';
import { SideNavComponent } from './adminComponent/side-nav/side-nav.component';
import { UserSideNavComponent } from './userComponents/user-side-nav/user-side-nav.component';


const routes: Routes = [
 {path:'',redirectTo:'coverPage',pathMatch:'full'},
 { path: 'coverPage', component: CoverPageComponent },
 { path: 'register1', component: Register1Component },
 { path: 'otp_verify', component: OtpVerificationComponent, },
 { path: 'admin',
   component:SideNavComponent,
    canActivate:[authGuard],
  children:[
    { path: 'dashboard', component: AdminDashboardComponent },
    {path:'user_list',component:UserListComponent}
  ]},

 
 {path:'user',
  component:UserSideNavComponent,
  children:[
  { path: 'home', component: HomeComponent },
 ]},

 {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
