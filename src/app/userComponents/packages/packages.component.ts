import { PaymentService } from './../../service/payment.service';
import { Component, OnInit } from '@angular/core';
import { PACKAGE } from '../../model/Interface';
import { PackageService } from '../../service/package.service';
import { env } from '../../model/enviornment';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { selectToken } from '../../state/auth.selectors';
import { StripeService } from 'ngx-stripe';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent implements OnInit{

  stripePromise = loadStripe(env.stripe);

  packages: PACKAGE[] = [];
  token$:Observable<string|null>;

  constructor(private service:PackageService,
              private http:HttpClient ,
              private paymentService :PaymentService,
              private store:Store ,
              private stripeService:StripeService,              
              ){
                this.token$ = store.select(selectToken)

              }




  ngOnInit(): void {
    this.service.getPackage().subscribe(res=>{
      this.packages=res;
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

// private async checkout(priceId: string): Promise<void> {
//   try {
//     const token = await this.token$.pipe(take(1)).toPromise(); // Wait for the token

//     if (!token) {
//       throw new Error('No token available');
//     }

//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`
//     });
//     console.log("hi checkout")

//     const response: any = await this.http.post(`${env.serverUrl}/user/checkout-session`, { priceId }, { headers }).toPromise();
//       console.log(response.sessionId+"response")
//     if (response && response.sessionId) {
//       const stripe = await this.stripePromise; // Ensure Stripe.js is loaded
//       if (stripe) {
//         const { error } = await stripe.redirectToCheckout({ sessionId: response.sessionId }); // Redirect to Stripe Checkout
//         if (error) {
//           console.error('Stripe error:', error);
//         }
//       } else {
//         throw new Error('Stripe not loaded');
//         this.toast.error("You are subscribed");

//       }
//     } else {
//       throw new Error('Invalid response from server');
//     }

//   } catch (error) {
//     console.error('Error during checkout:', error);
//     // Handle error (e.g., show user-friendly message)
//   }
// }




// private async checkout(priceId: string): Promise<void> {
//   try {
//     const token = await this.token$.pipe(take(1)).toPromise(); // Wait for the token

//     if (!token) {
//       throw new Error('No token available');
//     }
//     console.log("hi checkout")

//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`
//     });

//     const response: any = await this.http.post(`${env.serverUrl}/user/checkout-session`, { priceId }, { headers }).toPromise();
//       console.log(response+"rrrrrrrrrrrrrrrrrr")
//     if (typeof response === 'string' && response.startsWith('http')) {
//       const stripe = await this.stripePromise; // Ensure Stripe.js is loaded
//       console.log(stripe + "stripe");
//       if (stripe) {
//         stripe.redirectToCheckout({ sessionId:response }); // Redirect to Stripe Checkout
//       } else {
//         throw new Error('Stripe not loaded');
//       }
//     } else {
//       throw new Error('Invalid response from server');
//     }

//   } catch (error) {
//     console.error('Error during checkout:', error);
//     // Handle error (e.g., show user-friendly message)
//   }
// }

// checkout(priceId: string): Observable<any> {
//   return this.token$.pipe(
//     take(1),
//     switchMap(token => {
//       const headers = new HttpHeaders({
//         'Authorization': `Bearer ${token}`
//       });
//       console.log("checkout")
//       return this.http.post<{ sessionId: string }>(
//         `${env.serverUrl}/user/checkout-session`,
//         {priceId , headers }
//       );
//     }),
//     switchMap(response => {
//       console.log("jjjjjjjjjjjjjjj"+response.sessionId)
//       return from(this.stripePromise.then(stripe => 
//         stripe?.redirectToCheckout({ sessionId: response.sessionId })
//       ));
//     })
//   );
// }



}