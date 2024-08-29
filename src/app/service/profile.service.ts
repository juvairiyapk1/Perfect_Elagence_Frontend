import { selectAuthState } from './../state/auth.selectors';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, catchError, map, switchMap, take, throwError } from 'rxjs';
import { selectToken } from '../state/auth.selectors';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { PROFILE_PROFILE, ProfileResponse, USER_PROFILE } from '../model/Interface';
import { env } from '../model/enviornment';


const BASE_URL = env.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // token$:Observable<string|null>
  userId: number;
  token: string | null;

  private profileUpdatedSource = new Subject<void>();


  constructor(private store: Store,
    private http: HttpClient
  ) {
    if (typeof localStorage !== 'undefined') {
       this.token = localStorage.getItem('jwtToken')
      this.userId = Number(localStorage.getItem('userId'));
      
    } else {
      this.token = null;
      this.userId = 0;
    }
    console.log(this.userId+"constructor")
  }




  getUser(): Observable<USER_PROFILE> {

    const user =localStorage.getItem("userId")
    const token =localStorage.getItem("jwtToken")

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log(this.token + "getUser")

    return this.http.get<USER_PROFILE>(`${BASE_URL}/user/profile/${user}`, { headers });
  }

  profileUpdated$ = this.profileUpdatedSource.asObservable();

  notifyProfileUpdated() {
    this.profileUpdatedSource.next();
  }



  uploadImage(userId: number, file: File): Observable<any> {


    const formData: FormData = new FormData();
    formData.append('multipartFile', file);
    formData.append('userId', userId.toString());
    console.log(file + " file");
    console.log(userId + " user");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post<any>(`${BASE_URL}/user/upload`, formData, {
      headers: headers,
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total!);
            return { status: 'progress', message: progress };
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error.message || 'Server Error');
      })
    );
  }




  getProfile(): Observable<ProfileResponse> {
    const token =localStorage.getItem('jwtToken')
     const user =localStorage.getItem("userId")
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ProfileResponse>(`${BASE_URL}/user/getProfile/${user}`, { headers })

  }

  physical: string[] = [
    "Normal Person",
    "Deaf/Demb",
    "Blind",
    "Physically challenged",
    "Mentally challenged",
    "With other disability"
  ]

  marriagePlans: string[] = [
    "As soon as possible",
    "1-2 years",
    "3-4 years",
    "4+years"
  ];

  bloodGroup: string[] = [
    "A+",
    "A-",
    "AB+",
    "AB-",
    "B+",
    "B-",
    "O+",
    "O-"
  ]

  hairColor: string[] = [
    "Bold/Shaved",
    "Black",
    "Brown",
    "Grey/White",
    "Light Brown",
    "Red",
    "Changes Frequantly",
    "other",
    "Prefer not to say"
  ]

  hairType: string[] = [
    "Stright",
    "Wavy",
    "Curly",
    "Other",
    "Prefer not to say"
  ];

  eyeColor: string[] = [
    "Black",
    "Blue",
    "Brown",
    "Green",
    "Grey",
    "Hazel",
    "Other"
  ];
  residence: string[] = [
    "Citizen",
    "Permenent Resident",
    "Work Permit",
    "Student VISA",
    "Temporary VISA",
    "Other"
  ];

  familyType: string[] = [
    "Nuclear Family",
    "Joint Family"
  ];

  homeTypes: string[] = [
    "Home",
    "Rent House",
    "Apartment/Flat",
    "Rent Apartment/Flat",
    "Farm",
    "Town House",
    "other"
  ];



  livingSituation: string[] = [
    "Live alone",
    "Live with friends",
    "Live with family",
    "Live with kids",
    "Other"
  ]

  getPhysical(): string[] {
    return this.physical;
  }


  getMarriagePlan(): string[] {
    return this.marriagePlans;
  }

  getBloodGroup(): string[] {
    return this.bloodGroup;
  }


  getHairColor(): string[] {
    return this.hairColor;
  }

  getHairType(): string[] {
    return this.hairType;
  }
  getEyeColor() {
    return this.eyeColor;
  }

  getResidence(): string[] {
    return this.residence;
  }

  getFamilyType(): string[] {
    return this.familyType;
  }

  getHomeType(): string[] {
    return this.homeTypes;

  }

  getLivingSituation(): string[] {
    return this.livingSituation;
  }





  basicInfo(request: any): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(`${BASE_URL}/user/editUser/${this.userId}`, request, { headers });

  }



  educationalAndProfessionalInformation(request: any): Observable<any> {


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(`${BASE_URL}/user/updateProfile/${this.userId}`, request, { headers });

  }






  physicalAttributesInfo(request: any): Observable<any> {


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(`${BASE_URL}/user/updatePhysicalAttr/${this.userId}`, request, { headers });

  }



  locationAndContactInfo(request: any): Observable<any> {


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(`${BASE_URL}/user/updateLocationAndContact/${this.userId}`, request, { headers });

  }




  familyInfo(request: any): Observable<any> {


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.put(`${BASE_URL}/user/updateFamilyInfo/${this.userId}`, request, { headers });

  }




  getPartnerePref() {

    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<USER_PROFILE>(`${BASE_URL}/user/getPartnerProfile/${this.userId}`, { headers });

  }


  parnerBasicInfo(request: any): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.put(`${BASE_URL}/user/updatePartnerPref/${this.userId}`, request, { headers });
  }




  partnerEducationInfo(request: any): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.put(`${BASE_URL}/user/updatePartnerPrefEdu/${this.userId}`, request, { headers });
  }

  deleteProfile(reason: string, details: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  
    const options = {
      headers: headers,
      params: {
        userId: this.userId.toString(),
        reason,
        details
      }
    };
  
    return this.http.delete(`${BASE_URL}/user/profile`, options);
  }
  
}
