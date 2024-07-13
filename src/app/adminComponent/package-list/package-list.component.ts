import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AddPackageModalComponent } from '../add-package-modal/add-package-modal.component';
import { PACKAGE } from '../../model/Interface';
import { AdminServiceService } from '../../service/admin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit {

  packageList!: PACKAGE[];
  dataSource!: MatTableDataSource<PACKAGE>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns: string[] = [ 'packageName', 'duration', 'price'];

  constructor(
    private dialog: MatDialog,
    private service: AdminServiceService 
  ) {}

  ngOnInit(): void {
    this.loadPackage();
  }

  loadPackage() {
    this.service.getPackage().subscribe(
      (res) => {
        this.packageList = res;
        this.dataSource = new MatTableDataSource<PACKAGE>(this.packageList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching package list', error);
      }
    );
  }

  openPackageAddPopup() {
    const dialogRef = this.dialog.open(AddPackageModalComponent, {
      width: '400px',
      data: {} 
    });

    dialogRef.componentInstance?.packageAdded.subscribe(res=>{
      this.loadPackage();
    })

  }

}














