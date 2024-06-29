import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ProfileService } from '../../../service/profile.service';
import { RegisterServiceService } from '../../../service/register-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PROFILE_PROFILE } from '../../../model/Interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-edu-professional-info',
  templateUrl: './edit-edu-professional-info.component.html',
  styleUrl: './edit-edu-professional-info.component.scss'
})
export class EditEduProfessionalInfoComponent implements OnInit{
  @Output() profileUpdated:EventEmitter<PROFILE_PROFILE> = new EventEmitter<PROFILE_PROFILE>();

  marriagePlans:string[]=[];
  languages:string[]=[]

constructor(private profileService:ProfileService,
  private registerService:RegisterServiceService,
  private builder:FormBuilder,
  private toast:ToastrService,
  private ref:MatDialogRef<EditEduProfessionalInfoComponent>
){
  this.marriagePlans=this.profileService.getMarriagePlan();
   this.languages=this.registerService.getLanguages();

}

  profileUpdate!:FormGroup
  profile!:PROFILE_PROFILE;
 
  ngOnInit(): void {
    this.profileUpdate=this.builder.group({
      willingToRelocate:[''],
      marriagePlans:[''],
      educationInstitute:[''],
      languagesKnown:[''] 
    });
    this.profileService.getProfile().subscribe(res=>{
      this.profile=res;
      this.profileUpdate.patchValue({
        willingToRelocate:this.profile.willingToRelocate,
        marriagePlans:this.profile.marriagePlans,
        educationInstitute:this.profile.educationInstitute,
        languagesKnown:this.profile.languagesKnown
      });
    })
    
  }

  submitForm(){
    if(this.profileUpdate.valid){
      const profileData={
        willingToRelocate:this.profileUpdate.value.willingToRelocate,
        marriagePlans:this.profileUpdate.value.marriagePlans,
        educationInstitute:this.profileUpdate.value.educationInstitute,
        languagesKnown:this.profileUpdate.value.languagesKnown
      };
      this.profileService.educationalAndProfessionalInformation(profileData).subscribe(res=>{
        this.toast.success("Profile Updated Successfully");
        this.profileUpdated.emit(res);
        this.close();
      },
      (error)=>{
        this.toast.error("Updateion Failed");
      }
    )
    }
  }

  close(){
    this.ref.close();
  }

}
