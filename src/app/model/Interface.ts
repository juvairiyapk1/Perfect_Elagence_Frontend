 export interface USER{
    
    createProfileFor:string|null;
    name:string|null
    gender:string|null
    phoneNumber:number|null
    DOB:string|Date
    relegion:string|null
    nationality:string|null
    email:string|null
    password:string|null
    height:string |null
    weight:string|null
    maritalStatus:string|null
    skinTone: string|null
    bodyType: string|null
    physicaleStatus: string|null
    education:string|null
    profession:string|null
    homeLocation:string|null
    currentLocation:string|null
    motherTongue:string|null
    eatingHabits:string|null
    financialStatus:string|null
    primaryNumber:number|null
    secondryNumber:number|null
    preferredContactType:string|null
    contactPersonAndRelationship:string|null
    convenientTimeToCall:string|null
    
}

export interface LOGIN{
    
    email:string|null;
    password:string|null

}

export interface USER_ADMIN{
    id:number;
    name:string;
    email:string;
    phone:number;
    blocked:boolean;
    
}

export interface PROFILE{
      name: string;
      dob: Date;
      homeLocation: string;
      relegion: string;
      education: string;
      profession: string;
      image?:string;

}


