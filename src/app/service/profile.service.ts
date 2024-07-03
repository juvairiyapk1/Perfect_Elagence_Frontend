import { selectAuthState } from './../state/auth.selectors';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, catchError, map, switchMap, take, throwError } from 'rxjs';
import { selectToken } from '../state/auth.selectors';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { PROFILE_PROFILE, USER_PROFILE } from '../model/Interface';


const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  token$:Observable<string|null>
  userId!:string|null;

  private profileUpdatedSource = new Subject<void>();


  constructor(private store:Store,
    private http:HttpClient
  ) { 
    this.token$=store.select(selectToken);
  }

  getUser(): Observable<USER_PROFILE> {
    console.log("inside getAll users");
    return this.token$.pipe(
      take(1),
      switchMap(token => {
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        console.log(headers);
        if(typeof window !== 'undefined' && window.localStorage){
          this.userId=localStorage.getItem('userId');
        }

        if (!this.userId) {
          throw new Error("User ID is not available");
        }

        
        return this.http.get<USER_PROFILE>(`${BASE_URL}/user/profile/${this.userId}`, { headers });
      })
    );
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

    return this.token$.pipe(
      take(1),
      switchMap(token => {
        if (!token) {
          return throwError('Token is not available');
        }

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        return this.http.post<any>(`${BASE_URL}/user/upload`, formData, {
          headers: headers,
          reportProgress: true,
          observe: 'events'
        });
      }),
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


  getProfile(): Observable<PROFILE_PROFILE> {
    console.log("inside getAll users");
    return this.token$.pipe(
      take(1),
      switchMap(token => {
      
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        console.log(headers);
        if(typeof window !== 'undefined' && window.localStorage){
          this.userId=localStorage.getItem('userId');
        }

        if (!this.userId) {
          throw new Error("User ID is not available");
        }

        
        return this.http.get<USER_PROFILE>(`${BASE_URL}/user/getProfile/${this.userId}`, { headers });
      })
    );
  }
  physical:string[]=[
    "Normal Person",
    "Deaf/Demb",
    "Blind",
    "Physically challenged",
    "Mentally challenged",
    "With other disability"
  ]

  marriagePlans:string[]=[
    "As soon as possible",
    "1-2 years",
    "3-4 years",
    "4+years"
  ];

  bloodGroup:string[]=[
    "A+",
    "A-",
    "AB+",
    "AB-",
    "B+",
    "B-",
    "O+",
    "O-"
  ]

  hairColor:string[]=[
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

  hairType:string[]=[
    "Stright",
    "Wavy",
    "Curly",
    "Other",
    "Prefer not to say"
  ];

  eyeColor:string[]=[
    "Black",
    "Blue",
    "Brown",
    "Green",
    "Grey",
    "Hazel",
    "Other"
  ];
  residence:string[]=[
    "Citizen",
    "Permenent Resident",
    "Work Permit",
    "Student VISA",
    "Temporary VISA",
    "Other"
  ];

  familyType:string[]=[
    "Nuclear Family",
    "Joint Family"
  ];

  homeTypes:string[]=[
    "Home",
    "Rent House",
    "Apartment/Flat",
    "Rent Apartment/Flat",
    "Farm",
    "Town House",
    "other"
  ];

  

  livingSituation:string[]=[
    "Live alone",
    "Live with friends",
    "Live with family",
    "Live with kids",
    "Other"
  ]

  getPhysical():string[]{
    return this.physical;
  }


  getMarriagePlan():string[]{
    return this.marriagePlans;
  }

  getBloodGroup():string[]{
    return this.bloodGroup;
  }


  getHairColor():string[]{
   return this.hairColor;
  }

  getHairType():string[]{
    return this.hairType;
  }
  getEyeColor(){
    return this.eyeColor;
  }

  getResidence():string[]{
    return this.residence;
  }

  getFamilyType():string[]{
    return this.familyType;
  }

  getHomeType():string[]{
    return this.homeTypes;

  }

  getLivingSituation():string[]{
    return this.livingSituation;
  }

  

  basicInfo(request: any): Observable<any> {
    console.log(request+"hhhhhhhhhhhhhhhhhhhh")
    return this.token$.pipe(
      take(1),
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        if (typeof window !== 'undefined' && window.localStorage) {
          this.userId = localStorage.getItem('userId');
        }

        console.log("userId: " + this.userId);
        console.log("request: ", request);

        if (this.userId) {
          return this.http.put(`${BASE_URL}/user/editUser/${this.userId}`, request, { headers });
        } else {
          // Handle the case where userId is not found
          return new Observable(observer => {
            observer.error('User ID not found in local storage');
          });
        }
      })
    );
  }

  educationalAndProfessionalInformation(request:any):Observable<any>{
    return this.token$.pipe(
      take(1),
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        if (typeof window !== 'undefined' && window.localStorage) {
          this.userId = localStorage.getItem('userId');
        }
        if (this.userId) {
          return this.http.put(`${BASE_URL}/user/updateProfile/${this.userId}`, request, { headers });
        } else {
          // Handle the case where userId is not found
          return new Observable(observer => {
            observer.error('User ID not found in local storage');
          });
        }
      })
    );

  }


  physicalAttributesInfo(request:any):Observable<any>{
      return this.token$.pipe(
        take(1),
        switchMap(token => {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });

          if (typeof window !== 'undefined' && window.localStorage) {
            this.userId = localStorage.getItem('userId');
          }
          if (this.userId) {
            return this.http.put(`${BASE_URL}/user/updatePhysicalAttr/${this.userId}`, request, { headers });
          } else {
            // Handle the case where userId is not found
            return new Observable(observer => {
              observer.error('User ID not found in local storage');
            });
          }
        })
      );
  }

  locationAndContactInfo(request:any):Observable<any>{

        return this.token$.pipe(
          take(1),
          switchMap(token => {
            const headers = new HttpHeaders({
              'Authorization': `Bearer ${token}`
            });

            if (typeof window !== 'undefined' && window.localStorage) {
              this.userId = localStorage.getItem('userId');
            }
            if (this.userId) {
              return this.http.put(`${BASE_URL}/user/updateLocationAndContact/${this.userId}`, request, { headers });
            } else {
              // Handle the case where userId is not found
              return new Observable(observer => {
                observer.error('User ID not found in local storage');
              });
            }
          })
        );
      }
      
      familyInfo(request:any):Observable<any>{
        return this.token$.pipe(
          take(1),
          switchMap(token => {
            const headers = new HttpHeaders({
              'Authorization': `Bearer ${token}`
            });

            if (typeof window !== 'undefined' && window.localStorage) {
              this.userId = localStorage.getItem('userId');
            }
            if (this.userId) {
              return this.http.put(`${BASE_URL}/user/updateFamilyInfo/${this.userId}`, request, { headers });
            } else {
              // Handle the case where userId is not found
              return new Observable(observer => {
                observer.error('User ID not found in local storage');
              });
            }
          })
        );
      }


      getPartnerePref(){
        return this.token$.pipe(
          take(1),
          switchMap(token => {
          
            const headers = new HttpHeaders({
              'Authorization': `Bearer ${token}`
            });
            console.log(headers);
            if(typeof window !== 'undefined' && window.localStorage){
              this.userId=localStorage.getItem('userId');
            }
    
            if (!this.userId) {
              throw new Error("User ID is not available");
            }
    
            
            return this.http.get<USER_PROFILE>(`${BASE_URL}/user/getPartnerProfile/${this.userId}`, { headers });
          })
        );
      }

      parnerBasicInfo(request:any):Observable<any>{
        return this.token$.pipe(
          take(1),
          switchMap(token => {
            const headers = new HttpHeaders({
              'Authorization': `Bearer ${token}`
            });

            if (typeof window !== 'undefined' && window.localStorage) {
              this.userId = localStorage.getItem('userId');
            }
            if (this.userId) {
              return this.http.put(`${BASE_URL}/user/updatePartnerPref/${this.userId}`, request, { headers });
            } else {
              // Handle the case where userId is not found
              return new Observable(observer => {
                observer.error('User ID not found in local storage');
              });
            }
          })
        );
      }


      partnerEducationInfo(request:any):Observable<any>{
        return this.token$.pipe(
          take(1),
          switchMap(token => {
            const headers = new HttpHeaders({
              'Authorization': `Bearer ${token}`
            });

            if (typeof window !== 'undefined' && window.localStorage) {
              this.userId = localStorage.getItem('userId');
            }
            if (this.userId) {
              return this.http.put(`${BASE_URL}/user/updatePartnerPrefEdu/${this.userId}`, request, { headers });
            } else {
              // Handle the case where userId is not found
              return new Observable(observer => {
                observer.error('User ID not found in local storage');
              });
            }
          })
        );
      }

      
      
}
