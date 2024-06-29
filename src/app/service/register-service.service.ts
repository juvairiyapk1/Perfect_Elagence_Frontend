

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LOGIN, USER } from '../model/Interface';
import { Store } from '@ngrx/store';
import { clearToken } from '../state/auth.actions';
import { Router } from '@angular/router';


const BASE_URL = ['http://localhost:8080/auth/'];

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  private countryUrl='https://restcountries.com/v3.1/all';
  

  

  private religions: string[] = [
    'Christianity',
    'Islam',
    'Hinduism',
    'Buddhism',
    'Sikhism',
    'Judaism',
    'Ohter'
  ];

  private select:string[]=[
    "Son",
    "Doughter",
    "Sister",
    "Brother",
    "Friend",
    "Relative",
    "Myself"];

   private skinTones:string[]=[
      "Very fair",
      "Fair",
      "Wheatish",
      "Wheatish brown",
      "Dark",
      "Prefer not say"];
    
 private bodyTypes:string[]=[
      "Average",
      "Athletic",
      "Slim",
      "Heavy"];

  private education:string[]=[
        "Doctorate",
        "Masters",
        "Bachelors",
        "Diploma",
        "Trade School/TTC/ITI",
        "High Secondry School",
        " Less thanHigh School",
        "Other"
      ]; 
        
   private profession:string[]=[
          "Student",
          "Bussiness",
          "Agriculture",
          "Government",
          "Teacher",
          "Doctor" ,
          "Other"
          ];
  private languages:string[]=[
    "Malayalam",
    "English",
    "Hindi",
    "Arabic",
    "Tamil",
    "Telungu",
    "Kannada",
    "other"
  ];

  private eatHabits:string[]=[
    "vegetarian",
    "Non-vegetarian",
    "Other"
  ];

  private financialStatus:string[]=[
    "Rich",
    "Upper Middle-class",
    "Middle-class",
    "Lower Middle-class",
    "Poor",
    "Do not want to tell at this time"
  ];

  private contactType:string[]=[
    "Primary",
    "Secondary"
  ];

  private times:string[]=[
    "Morning",
    "Afternoon",
    "Evening",
    "Night",
  ]


  constructor(private http:HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.countryUrl);
  }

  getReligions(): string[] {
    return this.religions.sort((a, b) => a.localeCompare(b));
  }

  getSelectFor():string[]{
    return this.select;
  }

  getSkinTone():string[]{
    return this.skinTones;
  }

  getBodyType():string[]{
    return this.bodyTypes;
  }

  getEducation():string[]{
    return this.education;
  }

  getProfession(){
    return this.profession;
  }

  getLanguages(){
    return this.languages;
  }

  getHabits(){
    return this.eatHabits;
  }

  getFinancialStatus(){
    return this.financialStatus;
  }

  getContactType(){
    return this.contactType;
  }

  getTime(){
    return this.times;
  }

  
  register(request:USER): Observable<any> {
    console.log(request);
    return this.http.post(BASE_URL + 'register', request);
  }
  

  login(request:LOGIN): Observable<any> {
    console.log(request)  
    return this.http.post(BASE_URL + 'login',request);
  }


  logout():Observable<void>{
    return this.http.post<void>(BASE_URL + 'logout',{})
  }


  private createAuthorizationHeader(){
    const jwtToken = localStorage.getItem('jwt');
    if(jwtToken){
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
    } else {
      console.log("JWT token not found");
    }
    return null;
  }


 
  
}
