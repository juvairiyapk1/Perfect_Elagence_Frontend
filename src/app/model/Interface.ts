export interface USER {

    createProfileFor: string | null;
    name: string | null
    gender: string | null
    phoneNumber: number | null
    DOB: string | Date
    relegion: string | null
    nationality: string | null
    email: string | null
    password: string | null
    height: string | null
    weight: string | null
    maritalStatus: string | null
    skinTone: string | null
    bodyType: string | null
    physicaleStatus: string | null
    education: string | null
    profession: string | null
    homeLocation: string | null
    currentLocation: string | null
    motherTongue: string | null
    eatingHabits: string | null
    financialStatus: string | null
    primaryNumber: number | null
    secondryNumber: number | null
    preferredContactType: string | null
    contactPersonAndRelationship: string | null
    convenientTimeToCall: string | null

}

export interface LOGIN {

    email: string | null;
    password: string | null

}

export interface USER_ADMIN {
    id: number;
    name: string;
    email: string;
    phone: number;
    blocked: boolean;
    image?: string;
}

export interface PROFILE {
    name: string;
    dob: Date;
    homeLocation: string;
    relegion: string;
    education: string;
    profession: string;
    image?: string;


}

export interface USER_PROFILE {
    name?: string;
    dob?: Date;
    education?: string;
    homeLocation?: string;
    relegion?: string;
    image?: string;
    gender?: string;
    maritalStatus?: string;
    createProfileFor?: string;
    physicaleStatus?: string;
    profession?: string;
    height?: string;
    weight?: string;
    skinTone?: string;
    bodyType?: string;
    presentLocation?: string;
    Mobile?: number;
    email?: string;
    preferredContactType?: string;
    ContactPerson?: string;
    currentLocation?: string;
    motherTongue?: string;
    eatingHabits?: string;
    phoneNumber?: number;
    contactPersonAndRelationship?: string;
    convenientTimeToCall?: string;
    primaryNumber?: string;
    residentialStatus?: string;
    isSubscribed?:boolean;

}

export interface PROFILE_PROFILE {
    willingToRelocate?: string;
    languagesKnown?: string;
    educationInstitute?: string;
    eyeColor?: string;
    bloodGroup?: string;
    familyType?: string;
    homeType?: string;
    livingSituation?: string;
    marriagePlans?: string;
    hairColor?: string;
    hairType?: string;
    financialStatus?: string;
    image?: string;

}

export interface PARTNER_PROFILE {
    age?: string;
    height?: string;
    physicalStatus?: string;
    drinkingHabits?: string;
    appearance?: string;
    education?: string;
    maritalStatus?: string;
    complexion?: string;
    languagesSpoken?: string;
    religion?: string;
    motherTongue?: string;
    profession?: string;
    country?: string;
    city?: string;
}

export interface PACKAGE {
    packageName: string;
    duration: string;
    price: number;
    priceId: string;
}

export interface Payment_Response {
    clientSecret: string;
}

export interface Payment_Request {
    amount: number,
    currency: string,
    description: string,
    paymentMethod: string
}

export interface SUBCRIPTION {
    year: number,
    subcribedUser: number,
    colorCode: string
}

export interface SUBSCRIBR{
    
    user:string 
    subscriptionStartDate:Date;
    subscriptionEndDate:Date;
    amount:number;
    status:string;

     

}

export interface MonthlyUserSubscriptionDTO {
    months: string[];
    users: number[];
    subscriptions: number[];
  }


