import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrl: './sucess.component.scss'
})
export class SucessComponent implements OnInit {

  constructor(private route:ActivatedRoute){}
  userId:string|null='';

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const token = params['token'];});

    if(typeof window !== 'undefined' && window.localStorage){
      this.userId = localStorage.getItem('userId');
      console.log('Retrieved user ID:', this.userId); // Check the console output
    }
  }
  

  
}
