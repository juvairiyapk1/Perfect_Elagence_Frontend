import { ProfileService } from './../../../service/profile.service';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { RegisterServiceService } from '../../../service/register-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PARTNER_PROFILE } from '../../../model/Interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-edu-prof-pref',
  templateUrl: './edit-edu-prof-pref.component.html',
  styleUrl: './edit-edu-prof-pref.component.scss'
})
export class EditEduProfPrefComponent implements OnInit{
  @Output() partnerUpdated:EventEmitter<PARTNER_PROFILE> = new EventEmitter<PARTNER_PROFILE>();


  education:string[]=[];
  professions:string[]=[];

  constructor(private registerService:RegisterServiceService,
              private ref:MatDialogRef<EditEduProfPrefComponent>,
              private builder : FormBuilder,
              private profileService : ProfileService,
              private toast:ToastrService
              ){
                  this.education=registerService.getEducation();
                  this.professions = registerService.getProfession();

                }

                partenerUpdate!:FormGroup
                parnerProfile:PARTNER_PROFILE={}        

  ngOnInit(): void {
    this.partenerUpdate = this.builder.group({
      education : [''],
      profession :[''],
      country : [''],
      city : ['']
    });
    this.profileService.getPartnerePref().subscribe(res=>{
      this.parnerProfile=res;
      this.partenerUpdate.patchValue({
        education:this.parnerProfile.age,
        profession:this.parnerProfile.profession,
        country:this.parnerProfile.country,
        city:this.parnerProfile.city
      })
    })
    
  }

  close(){
    this.ref.close();
  }

  submitForm(){
    if(this.partenerUpdate.valid){
      const partnerData = {
        education:this.partenerUpdate.value.education,
        profession:this.partenerUpdate.value.profession,
        country:this.partenerUpdate.value.country,
        city:this.partenerUpdate.value.city
      };
      this.profileService.partnerEducationInfo(partnerData).subscribe(res=>{
        this.toast.success("Partner updated");
        this.partnerUpdated.emit(res);
         this.close();
      });
    }

  }
  
}
