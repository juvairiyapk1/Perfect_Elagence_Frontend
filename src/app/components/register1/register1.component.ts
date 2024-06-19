

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { RegisterServiceService } from '../../service/register-service.service';
import { CustomValidators } from '../../Validators/noSpaceAllowed.validator';
import { marriageAgeValidator } from '../../Validators/marriageAgeValidator.validator';
import { USER } from '../../model/Interface';
import  * as AuthActions from '../../state/auth.actions'



@Component({
  selector: 'app-register1',
  templateUrl: './register1.component.html',
  styleUrl: './register1.component.scss'
})
export class Register1Component implements OnInit {

  isLinear:boolean=true;
  userRegister!:FormGroup;
  expirationTime!: Date;


  constructor(private builder:FormBuilder,
              private registerService:RegisterServiceService,
              private router:Router,
              private store:Store<any>,
              private toast:ToastrService               ){}
  

  select:string[]=[];
  religions:string[]=[];
  countries: any[] = [];
  skinTones:string[]=[];
  bodyTypes:string[]=[];
  education:string[]=[];
  professions:string[]=[];
  languages:string[]=[];
  eatHabits:string[]=[];
  financialStatus:string[]=[];
  contactType:string[]=[];
  times:string[]=[];

  ngOnInit(): void {
    this.registerService.getCountries().subscribe((data) => {
      this.countries = data.sort((a: any, b: any) => 
        a.name.common.localeCompare(b.name.common));
    });
    this.userRegister = this.builder.group({
      accountSetUp:this.builder.group({
        createProfileFor:this.builder.control('',Validators.required),
        name:this.builder.control('',[Validators.required,CustomValidators.noSpaceAllowed]),
        gender:this.builder.control('Male'),
        phoneNumber:this.builder.control('',[Validators.required,Validators.minLength(10)])
      }),
      basicInformation:this.builder.group({
        DOB:this.builder.control(new Date(2000,2,20),[Validators.required]),
        relegion:this.builder.control('',Validators.required),
        nationality:this.builder.control('',Validators.required),
        email:this.builder.control('',[Validators.required,Validators.email]),
        password:this.builder.control('',[Validators.required,Validators.minLength(8)])
      }),
      personalDetails: this.builder.group({
        height: this.builder.control('', [Validators.required,CustomValidators.noSpaceAllowed]),
        weight: this.builder.control('', [Validators.required,CustomValidators.noSpaceAllowed]),
        maritalStatus: this.builder.control('Single'), // Add this line
        skinTone: this.builder.control('', Validators.required),
        bodyType: this.builder.control('', Validators.required),
        physicaleStatus: this.builder.control('No')
      }),
      educationAndLocation:this.builder.group({
        education:this.builder.control('',Validators.required),
        profession:this.builder.control('',Validators.required),
        homeLocation:this.builder.control('',[Validators.required,CustomValidators.noSpaceAllowed]),
        currentLocation:this.builder.control('',[Validators.required,CustomValidators.noSpaceAllowed])
      }),
      selfDescription:this.builder.group({
        motherTongue:this.builder.control('',[Validators.required,]),
        eatingHabits:this.builder.control('',[Validators.required,]),
        financialStatus:this.builder.control('',[Validators.required,]),
        primaryNumber:this.builder.control('',[Validators.minLength(10)]),
        secondryNumber:this.builder.control('',[Validators.minLength(10)]),
        preferredContactType:this.builder.control(''),
        contactPersonAndRelationship:this.builder.control('',Validators.required),
        convenientTimeToCall:this.builder.control('',Validators.required)
        
      })

    },{ validators: marriageAgeValidator() });


    this.religions=this.registerService.getReligions();
    this.select=this.registerService.getSelectFor();
    this.skinTones=this.registerService.getSkinTone();
    this.bodyTypes=this.registerService.getBodyType();
    this.education=this.registerService.getEducation();
    this.professions=this.registerService.getProfession();
    this.languages=this.registerService.getLanguages();
    this.eatHabits=this.registerService.getHabits();
    this.financialStatus=this.registerService.getFinancialStatus();
    this.contactType=this.registerService.getContactType();
    this.times=this.registerService.getTime(); 
  }


  

  getAccountSetup(){
    return this.userRegister.get("accountSetUp") as FormGroup;
  }

  getBasicInfo(){
    return this.userRegister.get("basicInformation") as FormGroup;
  }

  getPersonalDetails(){
    return this.userRegister.get("personalDetails") as FormGroup;
  }

  getEducationAndLocation(){
    return this.userRegister.get("educationAndLocation") as FormGroup;
  }

  getSelfDescription(){
    return this.userRegister.get("selfDescription") as FormGroup;
  }

  
  
  handleSubmit() {
    if (this.userRegister.valid) {
      const formValue = this.userRegister.value;
  
      const userData: USER = {
        // Assuming new user registration
        createProfileFor: formValue.accountSetUp.createProfileFor,
        name: formValue.accountSetUp.name,
        gender: formValue.accountSetUp.gender,
        phoneNumber: formValue.accountSetUp.phoneNumber,
        DOB: formValue.basicInformation.DOB,
        relegion: formValue.basicInformation.relegion,
        nationality: formValue.basicInformation.nationality,
        email: formValue.basicInformation.email,
        password: formValue.basicInformation.password,
        height: formValue.personalDetails.height,
        weight: formValue.personalDetails.weight,
        maritalStatus: formValue.personalDetails.maritalStatus,
        skinTone: formValue.personalDetails.skinTone,
        bodyType: formValue.personalDetails.bodyType,
        physicaleStatus: formValue.personalDetails.physicaleStatus,
        education: formValue.educationAndLocation.education,
        profession: formValue.educationAndLocation.profession,
        homeLocation: formValue.educationAndLocation.homeLocation,
        currentLocation: formValue.educationAndLocation.currentLocation,
        motherTongue: formValue.selfDescription.motherTongue,
        eatingHabits: formValue.selfDescription.eatingHabits,
        financialStatus: formValue.selfDescription.financialStatus,
        primaryNumber: formValue.selfDescription.primaryNumber,
        secondryNumber: formValue.selfDescription.secondryNumber,
        preferredContactType: formValue.selfDescription.preferredContactType,
        contactPersonAndRelationship: formValue.selfDescription.contactPersonAndRelationship,
        convenientTimeToCall: formValue.selfDescription.convenientTimeToCall,
      };
  
      console.log("Form Data: ", userData);
      this.registerService.register(userData).subscribe(
         (res) => {   
          this.expirationTime = new Date(res.expirationTime);
          localStorage.setItem('expirationTime', this.expirationTime.toISOString());
          this.router.navigate(['otp_verify'],{ queryParams: { email: userData.email } });  
        },
         (error) => {
          console.error("Error occurred during registration: ", error);
          if (error.status === 400 && error.error === 'Email already exists') {
            this.toast.error("Email already exists");
          } else {
            this.toast.error("An unexpected error occurred. Please try again.");
          }
        }
      );
    } else {
      console.error("Form is invalid");
    }
  }
  
  

}