import { Payment_Request } from '../../../model/Interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../../../service/payment.service';
import { Payment_Response } from '../../../model/Interface';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
} from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { environment as env } from '../../environments/environment';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

   cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  stripeTest!: FormGroup;


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {}
  
  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['Angular v10', [Validators.required]],
      amount: [1000, [Validators.required, Validators.pattern(/d+/)]],
    });
  }

  // pay(): void {
  //   if (this.stripeTest.valid) {
  //     this.createPaymentIntent(this.stripeTest.get('amount').value)
  //       .pipe(
  //         switchMap((pi) =>
  //           this.stripeService.confirmCardPayment(pi.client_secret, {
  //             payment_method: {
  //               card: this.card.element,
  //               billing_details: {
  //                 name: this.stripeTest.get('name').value,
  //               },
  //             },
  //           })
  //         )
  //       )
  //       .subscribe((result) => {
  //         if (result.error) {
  //           // Show error to your customer (e.g., insufficient funds)
  //           console.log(result.error.message);
  //         } else {
  //           // The payment has been processed!
  //           if (result.paymentIntent.status === 'succeeded') {
  //             // Show a success message to your customer
  //           }
  //         }
  //       });
  //   } else {
  //     console.log(this.stripeTest);
  //   }
  // }

  // createPaymentIntent(amount: number): Observable<PaymentIntent> {
  //   return this.http.post<PaymentIntent>(
  //     `${env.apiUrl}/create-payment-intent`,
  //     { amount }
  //   );
  // }

  
 


}
