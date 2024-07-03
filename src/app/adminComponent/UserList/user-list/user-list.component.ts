import { USER_ADMIN } from '../../../model/Interface';
import { Component, OnInit, ViewChild} from '@angular/core';
import { AdminServiceService } from '../../../service/admin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectToken } from '../../../state/auth.selectors';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

   userList!:USER_ADMIN[];
   dataSource!: MatTableDataSource<USER_ADMIN>;
   displayedColumns:string[]=['id','name','email','phoneNumber','role','action'];
   @ViewChild(MatPaginator) paginatior !: MatPaginator;
   @ViewChild(MatSort)sort!:MatSort;
  //  token$:Observable<string|null>;

  constructor(private service:AdminServiceService){}

  ngOnInit(): void {
    this.loadUserList();
  }

  loadUserList(): void {
    this.service.getUser().subscribe(res => {
      this.userList = res;
      console.log('User list fetched:', res);
      this.dataSource = new MatTableDataSource<USER_ADMIN>(this.userList);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error fetching user list', error);
    });
  }

              
  filterChange(data:Event){
 
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }

  

  blockUser(id: number): void {
    this.service.blockUser(id).subscribe(res => {
      console.log('User blocked successfully', res);
      const userToBlock = this.userList.find(user => user.id === id);
      if (userToBlock) {
        userToBlock.blocked = true; // Update the blocked status locally
      }
      // this.loadUserList(); // Refresh the user list after blocking a user
    }, error => {
      console.error('Error blocking user', error);
    });
  }

  unblockUser(id: number): void {
    this.service.unblockUser(id).subscribe(res => {
      console.log('User unblocked successfully', res);
      
      const userToUnblock = this.userList.find(user => user.id === id);
      if (userToUnblock) {
        userToUnblock.blocked = false;
      }
    }, error => {
      console.error('Error blocking user', error);
    });
  }


}
