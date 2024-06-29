import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from './../../../service/profile.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { USER_PROFILE } from '../../../model/Interface';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-edit-location-contact',
  templateUrl: './edit-location-contact.component.html',
  styleUrl: './edit-location-contact.component.scss'
})
export class EditLocationContactComponent implements OnInit{
  @Output() updatedProfile:EventEmitter<USER_PROFILE> = new EventEmitter<USER_PROFILE>();

  residens:string[]=[];

constructor(private profileService:ProfileService,
            private ref:MatDialogRef<EditLocationContactComponent>,
            private builder:FormBuilder ,
            private toast:ToastrService
           ){
              this.residens=this.profileService.getResidence();

            }
           


userUpdate!:FormGroup
profile:USER_PROFILE={};

ngOnInit(): void {
  this.userUpdate=this.builder.group({
    currentLocation:[''],
    residentialStatus:[''],
    homeLocation:[''],
    phoneNumber:[''],
    email:['']
  });
  this.profileService.getUser().subscribe((res)=>{
    this.profile=res;
    this.userUpdate.patchValue({
      currentLocation:this.profile.currentLocation,
      residentialStatus:this.profile.residentialStatus,
      homeLocation:this.profile.homeLocation,
      phoneNumber:this.profile.phoneNumber,
      email:this.profile.email,
    });
  });
}

submitForm(){
  if(this.userUpdate.valid){
    const userData = {
      currentLocation:this.userUpdate.value.currentLocation,
      residentialStatus:this.userUpdate.value.residentialStatus,
      homeLocation:this.userUpdate.value.homeLocation,
      phoneNumber:this.userUpdate.value.phoneNumber,
      email:this.userUpdate.value.email
    };
    this.profileService.locationAndContactInfo(userData).subscribe((res)=>{
       this.toast.success("Location & contact updated successfully");
       this.updatedProfile.emit(res);
       this.close();
    },
  (error)=>{
    this.toast.error("Updation Failed");
  })
  }
}

close(){
  this.ref.close();
}

}
