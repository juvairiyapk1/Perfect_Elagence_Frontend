import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export class CustomValidators{

     static noSpaceAllowed:ValidatorFn= (control:AbstractControl):ValidationErrors|null =>{
        if(control.value != null && control.value.indexOf(' ') != -1){
            return {noSpaceAllowed:true} 
        }
        return null;
    }
}
