import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { ProfileService } from '../../../service/profile.service';
import { RegisterServiceService } from '../../../service/register-service.service';
import { PROFILE_PROFILE} from '../../../model/Interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-family-det',
  templateUrl: './edit-family-det.component.html',
  styleUrl: './edit-family-det.component.scss'
})
export class EditFamilyDetComponent implements OnInit{
  @Output() updatedProfile:EventEmitter<PROFILE_PROFILE> = new EventEmitter<PROFILE_PROFILE>();


  familyType:string[]=[];
  financialStatus:string[]=[];
  homeType:string[]=[];
  livingSituation:string[]=[];
  
  constructor(private profileService:ProfileService,
    private registerService:RegisterServiceService,
    private builder:FormBuilder,
    private toast:ToastrService,
    private ref:MatDialogRef<EditFamilyDetComponent>
  ){
    this.familyType=this.profileService.getFamilyType();
    this.financialStatus=this.registerService.getFinancialStatus();
    this.homeType=this.profileService.getHomeType();
    this.livingSituation=this.profileService.getLivingSituation();
  }
  

  
  userUpdate!:FormGroup
  profile:PROFILE_PROFILE={}

  ngOnInit(): void {
    this.userUpdate=this.builder.group({
      familyType:[''],
      financialStatus:[''],
      homeType:[''],
      livingSituation:[''],
      fatherDetails:[''],
      motherDetails:['']
    });
    this.profileService.getProfile().subscribe((res)=>{
      this.profile=res.profile;
      this.userUpdate.patchValue({
        familyType:this.profile.familyType,
        financialStatus:this.profile.financialStatus,
        homeType:this.profile.homeType,
        livingSituation:this.profile.livingSituation,
        
      });
    }); 
  }

  submitForm(){
    if(this.userUpdate.valid){
      const userData={
        familyType :this.userUpdate.value.familyType,
        financialStatus:this.userUpdate.value.financialStatus,
        homeType:this.userUpdate.value.homeType,
        livingSituation:this.userUpdate.value.livingSituation
      };
      this.profileService.familyInfo(userData).subscribe(res=>{
        this.toast.success("Family updated");
        this.updatedProfile.emit(res);
        this.close()
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
