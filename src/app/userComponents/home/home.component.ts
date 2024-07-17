import { Component, OnInit } from '@angular/core';
import { PROFILE, PROFILE_PROFILE } from '../../model/Interface';
import { UserService } from '../../service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserProfileModalComponent } from '../user-profile-modal/user-profile-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  profiles:PROFILE[]=[];
  ProfileImage!:PROFILE_PROFILE;
  pageNo: number = 0;
  pageSize: number = 10;
  isSubscribed!:string|null;

  
  dataSource!: MatTableDataSource<PROFILE>;

  professions:string[]=[];
  selectedProfession: string = '';

  showNoProfilesMessage: boolean = false;



  constructor(private service:UserService,
    private dialog:MatDialog
  ){
    this.professions = ['All professions',...service.getProfession()];

    if(typeof window !== 'undefined' && window.localStorage){
     this.isSubscribed =localStorage.getItem('isSubscribed')
    }


  }

  ngOnInit(): void {
    this.loadProfiles();
    this.dataSource = new MatTableDataSource<PROFILE>(this.profiles);
     
    this.dataSource.filterPredicate = (data: PROFILE, filter: string) => {
      const searchTerm = filter.trim().toLowerCase();
      return data.name.toLowerCase().includes(searchTerm) || 
             data.education.toLowerCase().includes(searchTerm) ||
             data.profession.toLowerCase().includes(searchTerm) ||
             data.homeLocation.toLowerCase().includes(searchTerm);
    };

  }

  loadProfiles():void{
    const profession = this.selectedProfession === 'All Professions' ? '' : this.selectedProfession;

    this.service.getAllUsers(this.pageNo, this.pageSize,profession).subscribe(
      data => {
        this.profiles = data;
        
        this.dataSource.data = this.profiles;
        this.showNoProfilesMessage = this.profiles.length === 0;
      },
      error => {
        console.error('Error fetching profiles:', error);
      }
    );
  }

  onPageChange(newPage: number): void {
    this.pageNo = newPage;
    this.loadProfiles();
  }

  onPageSizeChange(event: Event): void {
    const newPageSize = (event.target as HTMLInputElement).value;
    this.pageSize = parseInt(newPageSize, 10);
    this.loadProfiles();
  }

  onProfessionChange(event:Event):void{
    console.log("hi inside on profession")
    this.selectedProfession = (event.target as HTMLInputElement).value;
    this.pageNo = 0;
    this.loadProfiles();

  }

  filterChange(data:Event){
 
    const value=(data.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter=value;
  }

  userProfilePopUp(userId:number){
     console.log(userId+"userzzz")
    this.dialog.open(UserProfileModalComponent,{
      width:'80%',
      height:'90%',
      data: { userId: userId }
    });
  }
    

  

}
