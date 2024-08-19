import { Component } from '@angular/core';
import { RegisterServiceService } from '../../service/register-service.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { clearToken } from '../../state/auth.actions';
import { AuthStateService } from '../../service/auth-state.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  constructor(private service:RegisterServiceService,
    private store:Store,
    private router:Router,
    private authStateService:AuthStateService,
  ){}

  logout(): void {
    this.service.logout().subscribe(() => {

      this.authStateService.setLoggedIn(false);
      this.authStateService.setIsAdmin(false);
      this.authStateService.setUserName(null);
      localStorage.clear();
      
      this.router.navigateByUrl('coverPage');
    }, error => {
      console.error('Error logging out', error);
    });
  }

}
