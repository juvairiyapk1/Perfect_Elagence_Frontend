import { Component } from '@angular/core';
import { Location } from '../../model/Interface';

@Component({
  selector: 'app-contac-us',
  templateUrl: './contac-us.component.html',
  styleUrl: './contac-us.component.scss'
})
export class ContacUsComponent {

  locations:Location[]=[
    {
      name: 'Calicut',
      address: [
        'Perfect Elegance, Third Floor',
        'Noble Building, Above Gramin Bank,',
        'Aravidathupalam',
        'Mavoor Road, Calicut-1, Kerala, India'
      ],
      contact: 'Call: 7025115558 Mob: 7025441166'
    },
    {
      name: 'Vatakara',
      address: [
        'Perfect Elegance, Second Floor',
        'Nesto Grand Square Mall(Above Galaxy Hypermarket)',
        'Near Keerthy Mudra Theatre,Edodi',
        'Vadakara, Kerala, India , Pin: 673101'
      ],
      contact: 'Call: 70254 45855'
    },
    {
      name: 'Kannur',
      address: [
        'Perfect Elegance, Second Floor',
        'Nesto Grand Square Mall(Above Galaxy Hypermarket)',
        'Near Keerthy Mudra Theatre,Edodi',
        'Vadakara, Kerala, India , Pin: 673101'
      ],
      contact: 'Call: 70254 45855'
    }
  ];

}
