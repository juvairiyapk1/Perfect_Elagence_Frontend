import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { RegisterServiceService } from '../../../service/register-service.service';
import { ProfileService } from '../../../service/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PARTNER_PROFILE } from '../../../model/Interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-basic-preference',
  templateUrl: './edit-basic-preference.component.html',
  styleUrl: './edit-basic-preference.component.scss'
})
export class EditBasicPreferenceComponent  implements OnInit {
  @Output() partnerUpdated:EventEmitter<PARTNER_PROFILE> = new EventEmitter<PARTNER_PROFILE>();

  skinTones:string[]=[];
  physical:string[]=[];
  languages:string[]=[];
  relegions:string[]=[];
  motherTongue:string[]=[];

  constructor(private registerService:RegisterServiceService,
              private profileService:ProfileService,
              private builder:FormBuilder,
              private toast:ToastrService,
              private ref:MatDialogRef<EditBasicPreferenceComponent>
              ){
                  this.skinTones=registerService.getSkinTone();
                  this.physical=profileService.getPhysical();
                  this.languages=registerService.getLanguages();
                  this.relegions=registerService.getReligions();
                  this.motherTongue=registerService.getLanguages();
               }
  


      partenerUpdate!:FormGroup
      parnerProfile:PARTNER_PROFILE={}

      ngOnInit(): void {
        this.partenerUpdate = this.builder.group({
          age:[''],
          maritalStatus:[''],
          height:[''],
          complexion:[''],
          physicalStatus:[''],
          languagesSpoken:[''],
          drinkingHabits:[''],
          religion:[''],
          appearance:[''],
          motherTongue:['']
        });

        this.profileService.getPartnerePref().subscribe(
          (res)=>{
            this.parnerProfile=res;
            this.partenerUpdate.patchValue({
              age:this.parnerProfile.age,
              maritalStatus:this.parnerProfile.maritalStatus,
              height:this.parnerProfile.height,
              complexion:this.parnerProfile.complexion,
              physicalStatus:this.parnerProfile.physicalStatus,
              languagesSpoken:this.parnerProfile.languagesSpoken,
              drinkingHabits:this.parnerProfile.drinkingHabits,
              religion:this.parnerProfile.religion,
              appearance:this.parnerProfile.appearance,
              motherTongue:this.parnerProfile.motherTongue
            })
          })
        
      }

      submitForm(){
        if(this.partenerUpdate.valid){
          const partnerData = {
              age:this.partenerUpdate.value.age,
              maritalStatus:this.partenerUpdate.value.maritalStatus,
              height:this.partenerUpdate.value.height,
              complexion:this.partenerUpdate.value.complexion,
              physicalStatus:this.partenerUpdate.value.physicalStatus,
              languagesSpoken:this.partenerUpdate.value.languagesSpoken,
              drinkingHabits:this.partenerUpdate.value.drinkingHabits,
              religion:this.partenerUpdate.value.religion,
              appearance:this.partenerUpdate.value.appearance,
              motherTongue:this.partenerUpdate.value.motherTongue
          };
          console.log(partnerData+"partnerData")
          this.profileService.parnerBasicInfo(partnerData).subscribe((res)=>
          {
              this.toast.success("Partner updated");
              this.partnerUpdated.emit(res);
               this.close();
          })
        }

      }
      
      close(){
        this.ref.close();
      }

}
