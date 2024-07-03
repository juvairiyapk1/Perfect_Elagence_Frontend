import { PACKAGE } from './../../model/Interface';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { PROFILE } from '../../model/Interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../service/admin-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-package-modal',
  templateUrl: './add-package-modal.component.html',
  styleUrl: './add-package-modal.component.scss'
})
export class AddPackageModalComponent implements OnInit {
  @Output() packageAdded:EventEmitter<PACKAGE> = new EventEmitter<PACKAGE>();

  constructor(private service:AdminServiceService,
              private builder:FormBuilder,
              private toast:ToastrService,
              private ref:MatDialogRef<AddPackageModalComponent>
              ){

              }
  
  packageData!:FormGroup
  pacakge!:PACKAGE


  ngOnInit(): void {
    this.packageData = this.builder.group({
      packageName:this.builder.control('',[Validators.required]),
      duration:this.builder.control('',Validators.required),
      price:this.builder.control('',Validators.required)
    })
  }

  
  formSubmit(){
   if(this.packageData.valid){
    const packageList:PACKAGE={
      packageName:this.packageData.value.packageName,
      duration:this.packageData.value.duration,
      price:this.packageData.value.price
    } 
    this.service.add(packageList).subscribe(res=>{
      this.toast.success("Package added successfully");
      this.packageAdded.emit(res);
     this.close();
    })
    
   }
  }

  close(){
    this.ref.close();
  }

}
