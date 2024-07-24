import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { setToken } from '../../../state/auth.actions';

@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrl: './sucess.component.scss'
})
export class SucessComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private store:Store
  ){}
  userId:string|null='';
  token: string | null = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.store.dispatch(setToken({ token: this.token }));
        
        localStorage.setItem('token', this.token);
      } else {
        console.error('No token provided in URL');
      }
    });

    if (typeof window !== 'undefined' && window.localStorage) {
      this.userId = localStorage.getItem('userId');
      if (this.userId) {
        console.log('Retrieved user ID:', this.userId);
      } else {
        console.error('No user ID found in localStorage');
      }
    } else {
      console.error('localStorage is not available');
    }
  }
  

  
}
