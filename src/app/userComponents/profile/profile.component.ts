import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { PARTNER_PROFILE, PROFILE, PROFILE_PROFILE, USER_PROFILE } from '../../model/Interface';
import { ProfileService } from '../../service/profile.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditBasicInfoComponent } from '../editProfile/edit-basic-info/edit-basic-info.component';
import { EditEduProfessionalInfoComponent } from '../editProfile/edit-edu-professional-info/edit-edu-professional-info.component';
import { EditPhysicaAttributesComponent } from '../editProfile/edit-physica-attributes/edit-physica-attributes.component';
import { EditLocationContactComponent } from '../editProfile/edit-location-contact/edit-location-contact.component';
import { EditFamilyDetComponent } from '../editProfile/edit-family-det/edit-family-det.component';
import { EditBasicPreferenceComponent } from '../editPartnerPreferance/edit-basic-preference/edit-basic-preference.component';
import { EditEduProfPrefComponent } from '../editPartnerPreferance/edit-edu-prof-pref/edit-edu-prof-pref.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent  implements OnInit{
   
  profile:USER_PROFILE={};
  profileData:PROFILE_PROFILE={};
  fileToUpload: File | null = null;
  uploadProgress: number | null = null;
  uploadedFileUrl: string | null = null;
  userId!:number;
  partner:PARTNER_PROFILE={};
  isSubscribed=false;

  imageUrl: string | ArrayBuffer | null = '';
  isLoading: boolean = false;
  
  constructor(private service:ProfileService,
              private http:HttpClient,
              private dialog:MatDialog
              ){}


  ngOnInit(): void {
    this.loadProfileData();
  }



  loadProfileData(){
      this.service.getUser().subscribe((res)=>{
        this.profile=res 
        console.log(this.profile)
         
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
      this.service.getPartnerePref().subscribe(res=>{
        this.partner=res;
      },
      error=>{
        console.error('error fetching partner',error);
      }
    )
    
  }


  

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {

      this.fileToUpload = input.files.item(0);
      console.log('File selected:', this.fileToUpload);

      const reader = new FileReader();
      reader.onload = (e)=>{
        this.imageUrl = e.target?.result as string;
      };
      if(this.fileToUpload)
      reader.readAsDataURL(this.fileToUpload)
    }

  }

  uploadFileToActivity() {
    if (this.fileToUpload) {
      this.isLoading = true;
      console.log('Load:', this.isLoading);
  
      if (typeof window !== 'undefined' && window.localStorage) {
        this.userId = parseInt(localStorage.getItem('userId')!);
        console.log(this.userId + " userId");
      }
      this.service.uploadImage(this.userId, this.fileToUpload).subscribe(
        data => {
          if (data.status === 'progress') {
            
            this.uploadProgress = data.message;
          } else {
            this.uploadedFileUrl = data.secure_url; // Adjust based on the response structure
            this.uploadProgress = null;
            this.service.getProfile().subscribe(res=>{
              this.profileData=res;
              this.isLoading = false;
              this.service.notifyProfileUpdated();
            });
          }
        },
        error => {
          console.error(error);
          this.uploadProgress = null;
          this.isLoading = false
        }
      );
    } else {
      console.error('No file selected.');
    }
  }

  openEditBasicInfoPopup(){
    const dialogRef=this.dialog.open(EditBasicInfoComponent,{
       width:'45%'
    });
    
    dialogRef.componentInstance.profileUpdated.subscribe((updatedProfile:USER_PROFILE)=>{
      this.profile=updatedProfile;
      this.loadProfileData();
    });
  }

  openEditEduProfPopup(){
     const dialoRef= this.dialog.open(EditEduProfessionalInfoComponent,{
      width:'45%'
    });
    
    dialoRef.componentInstance.profileUpdated.subscribe((updatedProfile)=>{
      this.profileData=updatedProfile;
      this.loadProfileData();
    })
  }

  openPhysicalAttributesPopup(){
    const dialogRef = this.dialog.open(EditPhysicaAttributesComponent,{
      width:'45%'
    });
   dialogRef.componentInstance.profileUpdated.subscribe((updatedProfile)=>{
    this.profileData=updatedProfile;
    this.loadProfileData();
   })
  }

  openLocationAndContactPopup(){
     const dialogRef = this.dialog.open(EditLocationContactComponent,{
      width:'45%'
    });
    dialogRef.componentInstance.updatedProfile.subscribe((updatedProfile)=>{
      this.profileData=updatedProfile;
      this.loadProfileData();
     })
  }

  openHomeDetailPopup(){
    const dialogRef = this.dialog.open(EditFamilyDetComponent,{
      width:'45%'
    });
    dialogRef.componentInstance.updatedProfile.subscribe((updatedProfile)=>{
      this.profileData=updatedProfile;
      this.loadProfileData();
     })
  }

  openEditPartnerBasicInfoPopup(){
     const dialogRef=this.dialog.open(EditBasicPreferenceComponent,{
      width:'45%'
    });

    dialogRef.componentInstance.partnerUpdated.subscribe((updatedPartner)=>{
      this.partner=updatedPartner;
      this.loadProfileData()
    })
  }

  openEditPartnerEduAndProfInfo(){
    const dialogRef = this.dialog.open(EditEduProfPrefComponent,{
      width:'45%'
    });
    dialogRef.componentInstance.partnerUpdated.subscribe((updatedPartner)=>{
      this.partner =updatedPartner;
      this.loadProfileData();
    })
  }

  removeImage(): void {
    this.fileToUpload = null;
    this.imageUrl = '';
  }
  
}
