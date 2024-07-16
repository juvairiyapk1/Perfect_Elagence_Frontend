import { Component, inject, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AdminServiceService } from '../../../service/admin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { SUBSCRIBR } from '../../../model/Interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent implements OnInit {

  constructor(private service:AdminServiceService,
    private dialog: MatDialog,
    private datePipe: DatePipe
  ){}

  ngOnInit(): void {
    this.fetchData();
    this.loadSubscribers();

  }
  private breakpointObserver = inject(BreakpointObserver);

  userCount: number = 0;
  blockedUserCount: number = 0;
  subscribersCount: number = 0;
  unsubscribersCount: number = 0;

  displayedColumns: string[] = ['user', 'subscriptionStartDate', 'subscriptionEndDate','amount', 'status'];
  subscribersList!: SUBSCRIBR[];
  dataSource!: MatTableDataSource<SUBSCRIBR>;


  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 2, rows: 1 },
          table: { cols: 1, rows: 2 },
        };
      }
      
 
     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4  , rows: 2 },
      };
    })
  );

  fetchData() {
    this.service.getUserCounts().subscribe(counts => {
      this.userCount = counts.totalUsers;
      this.blockedUserCount = counts.blockedUsers;
      this.subscribersCount = counts.subscribers;
      this.unsubscribersCount = counts.unsubscribers;
    });
  }



  loadSubscribers() {
    this.service.getSubscriber().subscribe(
      (res) => {
        const transformedRes = res.map(subscriber => ({
          ...subscriber,
          sDate: this.datePipe.transform(subscriber.subscriptionStartDate, 'yyyy-MM-dd'),
          eDate: this.datePipe.transform(subscriber.subscriptionEndDate, 'yyyy-MM-dd')
        }));
  
        // Extract the recent 5 subscribers
        const recentSubscribers = transformedRes.slice(-5);
  
        console.log(recentSubscribers);
  
        this.dataSource = new MatTableDataSource<SUBSCRIBR>(recentSubscribers);
        
      },
      (error) => {
        console.error('Error fetching package list', error);
      }
    );
  }
  
}
