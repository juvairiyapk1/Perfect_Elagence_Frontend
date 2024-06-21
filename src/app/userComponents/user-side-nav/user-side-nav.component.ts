import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { RegisterServiceService } from '../../service/register-service.service';
import { Store } from '@ngrx/store';
import { clearToken } from '../../state/auth.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-side-nav',
  templateUrl: './user-side-nav.component.html',
  styleUrl: './user-side-nav.component.scss'
})
export class UserSideNavComponent implements AfterViewInit{

  @ViewChild(MatSidenav)sidenav!:MatSidenav;
  user!:string|null;

  constructor(private observer:BreakpointObserver,
    private cdRef: ChangeDetectorRef,
    private service:RegisterServiceService,
    private store:Store,
    private router:Router,
    
  ){
    if(typeof window !== 'undefined' && window.localStorage){
      this.user=localStorage.getItem('userName')
     }
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
