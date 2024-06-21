import { Component } from '@angular/core';
import { RegisterServiceService } from '../../service/register-service.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { clearToken } from '../../state/auth.actions';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  constructor(private service:RegisterServiceService,
    private store:Store,
    private router:Router
  ){}

  logout(): void {
    this.service.logout().subscribe(() => {
      this.store.dispatch(clearToken());
      this.router.navigateByUrl('coverPage');
    }, error => {
      console.error('Error logging out', error);
    });
  }

}
