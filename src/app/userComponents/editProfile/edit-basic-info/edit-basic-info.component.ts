import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { RegisterServiceService } from '../../../service/register-service.service';
import { ProfileService } from '../../../service/profile.service';
import { PROFILE, USER_PROFILE } from '../../../model/Interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import e from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-basic-info',
  templateUrl: './edit-basic-info.component.html',
  styleUrl: './edit-basic-info.component.scss'
})
export class EditBasicInfoComponent implements OnInit{
  @Output() profileUpdated:EventEmitter<USER_PROFILE> = new EventEmitter<USER_PROFILE>();

  select:string[]=[];
  education:string[]=[];
  physical:string[]=[];
  professions:string[]=[];
  skinTones:string[]=[];
  bodyTypes:string[]=[];


  constructor(private registerService:RegisterServiceService,
              private profileService:ProfileService,
              private fb:FormBuilder,
              private ref:MatDialogRef<EditBasicInfoComponent>,
              private toast:ToastrService
  ){
    this.select=this.registerService.getSelectFor();
    this.education=this.registerService.getEducation();
    this.physical=this.profileService.getPhysical();
    this.professions=this.registerService.getProfession();
    this.skinTones=this.registerService.getSkinTone();
    this.bodyTypes=this.registerService.getBodyType();

  }
  


  userUpdate!:FormGroup
  profile:USER_PROFILE={};


  ngOnInit(): void {
    this.profileService.getUser().subscribe(res => {
      this.profile = res;
      this.userUpdate.patchValue({
        name: this.profile.name,
        dob: this.profile.dob,
        gender: this.profile.gender,
        maritalStatus: this.profile.maritalStatus,
        createProfileFor: this.profile.createProfileFor,
        education: this.profile.education,
        physicaleStatus: this.profile.physicaleStatus,
        profession: this.profile.profession,
        skinTone:this.profile.skinTone,
        bodyType:this.profile.bodyType
      });
    });
    this.userUpdate = this.fb.group({
      name: [''],
      dob: [''],
      gender: [''],
      maritalStatus: [''],
      createProfileFor: [''],
      education: [''],
      physicaleStatus: [''],
      profession: [''],
      skinTone:[''],
      bodyType:['']
    });
  }
  submitForm(){
    if(this.userUpdate.valid){
      const userData={
        name:this.userUpdate.value.name,
        dob:this.userUpdate.value.dob,
        gender:this.userUpdate.value.gender,
        maritalStatus:this.userUpdate.value.maritalStatus,
        createProfileFor:this.userUpdate.value.createProfileFor,
        education:this.userUpdate.value.education,
        physicaleStatus:this.userUpdate.value.physicaleStatus,
        profession:this.userUpdate.value.profession,
        bodyType:this.userUpdate.value.bodyType,
        skinTone:this.userUpdate.value.skinTone,
 
      };
      console.log(userData.bodyType+"body type")
      this.profileService.basicInfo(userData).subscribe(
        (res)=>{
         this.toast.success("updated successfully");
         this.profileUpdated.emit(res);
         this.close();
      },
    (error)=>{
      this.toast.error("Failed")
    })
    }

  }

  close(){
    this.ref.close();
  }


}
