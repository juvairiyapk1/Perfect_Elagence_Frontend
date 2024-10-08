import { PaymentService } from './../../service/payment.service';
import { Component, OnInit } from '@angular/core';
import { PACKAGE } from '../../model/Interface';
import { PackageService } from '../../service/package.service';
import { env } from '../../model/enviornment';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent implements OnInit{

  stripePromise = loadStripe(env.stripe);

  isLoading = true;

  packages: PACKAGE[] = [];

  constructor(private service:PackageService,
              private http:HttpClient ,
              private paymentService :PaymentService,             
              ){

              }




  ngOnInit(): void {
    this.service.getPackage().subscribe(res=>{
      this.packages=res;
      this.isLoading=false;
    })
  }

  selectedPackage:any;
  userId!:string|null;

 
  
  onPackageSelect(pkg: any): void {
    this.selectedPackage = pkg;
    
    this.paymentService.checkout(pkg.priceId).subscribe(
      (url: string) => {
        window.location.href = url;
        console.log(url+"my url")
      },
      (error) => {
        console.error('Error creating checkout session:', error);
      }
    );
}

}