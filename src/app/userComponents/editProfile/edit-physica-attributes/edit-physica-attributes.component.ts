
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RegisterServiceService } from '../../../service/register-service.service';
import { ProfileService } from '../../../service/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PROFILE_PROFILE } from '../../../model/Interface';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-edit-physica-attributes',
  templateUrl: './edit-physica-attributes.component.html',
  styleUrl: './edit-physica-attributes.component.scss'
})
export class EditPhysicaAttributesComponent implements OnInit{
  @Output() profileUpdated:EventEmitter<PROFILE_PROFILE> = new EventEmitter<PROFILE_PROFILE>();

  bloodGroup:string[]=[];
  hairColors:string[]=[];
  hairTypes:string[]=[];
  eyeColors:string[]=[];

  constructor(private registerService:RegisterServiceService,
              private profileService:ProfileService,
              private builder:FormBuilder,
              private ref:MatDialogRef<EditPhysicaAttributesComponent>,
              private toast:ToastrService
             ){
                  this.bloodGroup=this.profileService.getBloodGroup();
                  this.hairColors=this.profileService.getHairColor();
                  this.hairTypes=this.profileService.getHairType();
                  this.eyeColors=this.profileService.getEyeColor();
                }

  

  profileUpdate!:FormGroup;
  profile:PROFILE_PROFILE={};

  ngOnInit(): void {
    this.profileUpdate=this.builder.group({
      bloodGroup:[''],
      hairColor:[''],
      hairType:[''],
      eyeColor:['']
    });
    this.profileService.getProfile().subscribe(res=>{
      this.profile=res.profile;
      this.profileUpdate.patchValue({
        bloodGroup:this.profile.bloodGroup,
        hairColor:this.profile.hairColor,
        hairType:this.profile.hairType,
        eyeColor:this.profile.eyeColor,
      });
    })


  }

  submitForm(){
      if(this.profileUpdate.valid){
        const profileData = {
          bloodGroup:this.profileUpdate.value.bloodGroup,
          hairColor:this.profileUpdate.value.hairColor,
          hairType:this.profileUpdate.value.hairType,
          eyeColor:this.profileUpdate.value.eyeColor
        };
        this.profileService.physicalAttributesInfo(profileData).subscribe(res=>{
          this.toast.success("Updated successfully");
          this.profileUpdated.emit(res);
          this.close();

        },
      error=>{
        this.toast.error("Updation Failed");
      })
      }
  }

  close(){
    this.ref.close();
  }

}
