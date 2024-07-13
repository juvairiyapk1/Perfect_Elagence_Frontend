import { Component, OnInit, ViewChild } from '@angular/core';
import { SUBSCRIBR } from '../../model/Interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AdminServiceService } from '../../service/admin-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-subscribers-list',
  templateUrl: './subscribers-list.component.html',
  styleUrl: './subscribers-list.component.scss'
})
export class SubscribersListComponent implements OnInit{

  subscribersList!: SUBSCRIBR[];
  dataSource!: MatTableDataSource<SUBSCRIBR>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns: string[] = [ 'user', 'subscriptionStartDate','subscriptionEndDate','status'];


  constructor(
    private dialog: MatDialog,
    private service: AdminServiceService ,
    private datePipe:DatePipe
  ) {}

  ngOnInit(): void {
    this.loadSubscribers();
  }

  loadSubscribers(){
    this.service.getSubscriber().subscribe(
      (res) => {
        this.subscribersList = res.map(subscriber=>({
          ...subscriber,
          sDate: this.datePipe.transform(subscriber.subscriptionStartDate, 'yyyy-MM-dd'),
          eDate:this.datePipe.transform(subscriber.subscriptionEndDate,'yyyy-MM-dd')

        }));
        console.log(this.subscribersList)

        this.dataSource = new MatTableDataSource<SUBSCRIBR>(this.subscribersList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching package list', error);
      }
    )
  }
}
