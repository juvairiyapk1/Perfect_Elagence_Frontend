import { Component } from '@angular/core';
import { RegisterServiceService } from '../../../service/register-service.service';
import { ProfileService } from '../../../service/profile.service';

@Component({
  selector: 'app-edit-basic-preference',
  templateUrl: './edit-basic-preference.component.html',
  styleUrl: './edit-basic-preference.component.scss'
})
export class EditBasicPreferenceComponent {

  skinTones:string[]=[];
  physical:string[]=[];
  languages:string[]=[];
  relegions :string[]=[];
  motherTongue:string[]=[];

  constructor(private registerService:RegisterServiceService,
              private profileService:ProfileService

              ){
                  this.skinTones=registerService.getSkinTone();
                  this.physical=profileService.getPhysical();
                  this.languages=registerService.getLanguages();
                  this.relegions=registerService.getReligions();
                  this.motherTongue=registerService.getLanguages();
               }




}
