import { Component, OnInit } from '@angular/core';
import { PACKAGE } from '../../model/Interface';
import { PackageService } from '../../service/package.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent implements OnInit{

  packages: PACKAGE[] = [];

  constructor(private service:PackageService){}

  ngOnInit(): void {
    this.service.getPackage().subscribe(res=>{
      this.packages=res;
    })
  }

 

  // selectedPackage: PACKAGE | null = null;

  // selectPackage(pkg: PACKAGE): void {
  //   this.selectedPackage = pkg;
  // }

}

  