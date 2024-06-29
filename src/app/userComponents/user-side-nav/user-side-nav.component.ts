import { ProfileComponent } from './../profile/profile.component';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { RegisterServiceService } from '../../service/register-service.service';
import { Store } from '@ngrx/store';
import { clearToken } from '../../state/auth.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../../service/profile.service';
import { PROFILE_PROFILE } from '../../model/Interface';


@Component({
  selector: 'app-user-side-nav',
  templateUrl: './user-side-nav.component.html',
  styleUrl: './user-side-nav.component.scss'
})
export class UserSideNavComponent implements AfterViewInit,OnInit{

  @ViewChild(MatSidenav)sidenav!:MatSidenav;
  // @ViewChild(ProfileComponent) profileComponent!: ProfileComponent;
  user:string|null="";
  profileImg:PROFILE_PROFILE={};

  constructor(private observer:BreakpointObserver,
    private cdRef: ChangeDetectorRef,
    private service:RegisterServiceService,
    private store:Store,
    private router:Router,
    private profileService:ProfileService
  ){
    if(typeof window !== 'undefined' && window.localStorage){
      this.user=localStorage.getItem('userName')
     }
  }
  ngOnInit(): void {
    this.profileService.getProfile().subscribe((res)=>{
      this.profileImg=res;
    });
    
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

    // if(this.profileComponent){
    //   this.profileComponent.imageUpdated.subscribe(()=>{
    //     this.profileService.getProfile().subscribe(res=>{
    //       this.profileImg=res;
    //     })
    //   })
    // }
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
