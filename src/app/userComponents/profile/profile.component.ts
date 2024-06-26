import { Component, OnInit } from '@angular/core';
import { PROFILE, PROFILE_PROFILE, USER_PROFILE } from '../../model/Interface';
import { ProfileService } from '../../service/profile.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent  implements OnInit{

  profile!:USER_PROFILE;
  profileData:PROFILE_PROFILE={};
  fileToUpload: File | null = null;
  uploadProgress: number | null = null;
  uploadedFileUrl: string | null = null;
  userId!:number;
  constructor(private service:ProfileService,
    private http:HttpClient
  ){
   
  }


  ngOnInit(): void {
    this.service.getUser().subscribe((res)=>{
        this.profile=res
    },
    error => {
      console.error('Error fetching profiles:', error);
    }
  );
  this.service.getProfile().subscribe((res)=>{
    this.profileData =res
  },
  error => {
    console.error('Error fetching profiles:', error);
  }
);

  }


  

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileToUpload = input.files.item(0);
      console.log('File selected:', this.fileToUpload);
    }
  }

  uploadFileToActivity() {
    if (this.fileToUpload) {
      console.log('Uploading file:', this.fileToUpload.name);
  
      if (typeof window !== 'undefined' && window.localStorage) {
        this.userId = parseInt(localStorage.getItem('userId')!);
        console.log(this.userId + " userId");
      }
      this.service.uploadImage(this.userId, this.fileToUpload).subscribe(
        data => {
          if (data.status === 'progress') {
            console.log(data + " data");
            this.uploadProgress = data.message;
          } else {
            this.uploadedFileUrl = data.secure_url; // Adjust based on the response structure
            this.uploadProgress = null;
            this.service.getProfile().subscribe(res=>{
              this.profileData=res;
            });
          }
        },
        error => {
          console.error(error);
          this.uploadProgress = null;
        }
      );
    } else {
      console.error('No file selected.');
    }
  }

  
}
