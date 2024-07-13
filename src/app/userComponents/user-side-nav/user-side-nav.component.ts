import { ProfileComponent } from './../profile/profile.component';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { RegisterServiceService } from '../../service/register-service.service';
import { Store } from '@ngrx/store';
import { clearToken } from '../../state/auth.actions';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProfileService } from '../../service/profile.service';
import { PROFILE_PROFILE } from '../../model/Interface';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-user-side-nav',
  templateUrl: './user-side-nav.component.html',
  styleUrl: './user-side-nav.component.scss'
})
export class UserSideNavComponent implements AfterViewInit,OnInit{

  @ViewChild(MatSidenav)sidenav!:MatSidenav;

  private profileUpdateSubscription!: Subscription;


  user:string|null="";
  profileImg:PROFILE_PROFILE={};
  professions:string[]=[];
  // isSubscribed:boolean=false;

  constructor(private observer:BreakpointObserver,
    private cdRef: ChangeDetectorRef,
    private service:RegisterServiceService,
    private store:Store,
    private router:Router,
    private profileService:ProfileService,
  
  ){
    if(typeof window !== 'undefined' && window.localStorage){
      this.user=localStorage.getItem('userName')
     }
  }

  ngOnInit(): void {
     this.fetchProfile(); 
     this.profileUpdateSubscription = this.profileService.profileUpdated$.subscribe(()=>{
      this.fetchProfile()
     });
  }
  
  fetchProfile(): void {
    this.profileService.getProfile().subscribe(
      (res: PROFILE_PROFILE) => {
        this.profileImg = res;
        // if(res.subscriptionId!= null){
        //   this.isSubscribed=true;
        // }
      },
      error => {
        console.error('Error fetching profile:', error);
        // Handle error as needed
      }
    );
  }
  
  

  

  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
      if(res.matches){
         this.sidenav.mode = 'over';
         this.sidenav.close();
      }else{
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }

      this.cdRef.detectChanges();

    });

    
  }

  logout(): void {
    this.service.logout().subscribe(() => {
      this.store.dispatch(clearToken());
      localStorage.clear();
      this.router.navigateByUrl('coverPage');
    }, error => {
      console.error('Error logging out', error);
    });
  }

  
  
  
}
