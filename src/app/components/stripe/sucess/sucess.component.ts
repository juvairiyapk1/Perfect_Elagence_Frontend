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
    
  }
  

  
}
