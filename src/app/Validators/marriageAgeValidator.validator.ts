import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function marriageAgeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dobControl = control.get('DOB');
    const genderControl = control.get('gender');
    
    if (!dobControl || !genderControl) {
      return null; // controls are not ready
    }

    const dob = dobControl.value;
    const gender = genderControl.value;
    
    if (!dob || !gender) {
      return null; // values are not set
    }

    const age = calculateAge(dob);
    const minAge = gender === 'male' ? 21 : gender === 'female' ? 18 : 0;

    return age >= minAge ? null : { marriageAgeNotReached: true };
  };
}

function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}
