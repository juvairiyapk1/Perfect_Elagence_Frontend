import { Component, OnInit } from '@angular/core';
import { PROFILE, PROFILE_PROFILE } from '../../model/Interface';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  profiles:PROFILE[]=[];
  ProfileImage!:PROFILE_PROFILE;
  constructor(private service:UserService){}

  ngOnInit(): void {
    this.service.getAllUsers().subscribe(
      data => {
        this.profiles = data;
      },
      error => {
        console.error('Error fetching profiles:', error);
      }
    );
  }
}
