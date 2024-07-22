import { UserService } from './../../service/user.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { RegisterServiceService } from '../../service/register-service.service';
import { Store } from '@ngrx/store';
import { clearToken } from '../../state/auth.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from '../../service/profile.service';
import { PROFILE_PROFILE, USER_PROFILE } from '../../model/Interface';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';


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
  isSubscribed!:string|null;
  isProfileHidden: boolean = false;

  constructor(private observer:BreakpointObserver,
    private cdRef: ChangeDetectorRef,
    private service:RegisterServiceService,
    private store:Store,
    private router:Router,
    private profileService:ProfileService,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private userService:UserService,
    private toast:ToastrService

  ){
    if(typeof window !== 'undefined' && window.localStorage){
      this.user=localStorage.getItem('userName');
      this.isSubscribed=localStorage.getItem('isSubscribed');
      console.log(this.isSubscribed+"sub")
     }
  }

  ngOnInit(): void {
     this.fetchProfile(); 
     this.profileUpdateSubscription = this.profileService.profileUpdated$.subscribe(()=>{
      this.fetchProfile();
    
     });

     console.log('UserSideNavComponent initialized');
  this.route.queryParams.subscribe(params => {
    console.log('Query params:', params);
    if (params['redirectTo'] === 'success') {
      this.router.navigate(['success'], { relativeTo: this.route });
    }
  });

  this.fetchProfileVisibility();
  }
  
  fetchProfile(): void {
    this.profileService.getProfile().subscribe(
      (res: PROFILE_PROFILE) => {
        this.profileImg = res;
        
      },
      error => {
        console.error('Error fetching profile:', error);
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

  openEmailVerifyPopUp() {
    this.dialog.open(VerifyEmailComponent, {
      width: '35%',
      data: {
        title: 'Email Verification !!'
      }
    });
    
  }

  toggleProfileVisibility(event: MatSlideToggleChange) {
    const newVisibility = event.checked;
    console.log('Toggling profile visibility to:', newVisibility);
    
    this.userService.updateProfileVisibility(newVisibility).subscribe(
      (response: any) => {
        this.isProfileHidden = newVisibility;
        console.log('Profile visibility updated successfully');
        this.toast.success(response.message || 'Profile visibility updated');
      },
      (error) => {
        console.error('Error updating profile visibility', error);
        this.toast.error('Failed to update profile visibility');
        // Revert the toggle if the API call fails
        event.source.checked = !newVisibility;
      }
    );
  }

  fetchProfileVisibility(): void {
    this.userService.getProfileVisibility().subscribe(
      (isHidden: boolean) => {
        this.isProfileHidden = isHidden;
        console.log('Profile hidden status:', this.isProfileHidden);
      },
      error => {
        console.error('Error fetching profile visibility:', error);
      }
    );
  }
  
 
}
