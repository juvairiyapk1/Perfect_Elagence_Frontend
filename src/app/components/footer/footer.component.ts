import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { JwtServiceService } from '../../service/jwt-service.service';
import { selectToken } from '../../state/auth.selectors';
import { Roles } from '../../model/roles.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{

  user!:string|null;
  isLoggedIn!:boolean;
  isUser=false;

  constructor(private store:Store,
    private service:JwtServiceService){

  }


  ngOnInit(): void {
    this.store.select(selectToken).subscribe(token => {
      if (token) {
        this.isLoggedIn = true;
        if (typeof window !== 'undefined' && window.localStorage) {
          this.user = localStorage.getItem('userName');
        }
        this.service.getRoles().subscribe((roles) => {
          this.isUser = roles.includes(Roles.USER);
        });
      } else {
        this.isLoggedIn = false;
        this.isUser = false;
      }
    });
  }

}
