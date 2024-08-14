import { Component, OnInit } from '@angular/core';
import {  PROFILE, PROFILE_PROFILE } from '../../model/Interface';
import { UserService } from '../../service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserProfileModalComponent } from '../user-profile-modal/user-profile-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { ProfileService } from '../../service/profile.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  isSubscribed:boolean|undefined;
  matchScores:number[]=[];  
  showchat=false;
  currentUserId: string|null; 
  

  
  dataSource!: MatTableDataSource<PROFILE>;

  professions:string[]=[];
  selectedProfession: string = '';

  showNoProfilesMessage: boolean = false;

  token:string|null;


  constructor(private service:UserService,
    private dialog:MatDialog,
    private profileService:ProfileService,
    private router:Router,
    private toast:ToastrService
  ){
    this.professions = ['All professions',...service.getProfession()];

    if(typeof window !== 'undefined' && window.localStorage){
       this.token =localStorage.getItem('jwtToken');
       this.currentUserId =localStorage.getItem('userId');
    }else{
      this.token = null;
      this.currentUserId =null;
    }

  
  }

  ngOnInit(): void {
    this.pageSize = Number(localStorage.getItem('preferredPageSize')) || 10;
    this.loadProfiles();
    this.loadSubscription();
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
        this.loadMatchCount();
        this.showNoProfilesMessage = this.profiles.length === 0;
        
      },
      error => {
        console.error('Error fetching profiles:', error);
      }
    );
  }

  loadSubscription(): void {
    this.profileService.getProfile().subscribe(
      res => {
        if (res && typeof res.subscribed === 'boolean') {
          this.isSubscribed = res.subscribed;
          console.log(this.isSubscribed); // Should log true or false
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error => {
        console.error('Error fetching profile subscription status:', error);
      }
    );
  }
  

  onPageChange(newPage: number): void {
    this.pageNo = newPage;
    this.loadProfiles();
  }

  onPageSizeChange(event: Event): void {
    localStorage.setItem('preferredPageSize', this.pageSize.toString());
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

  handleCardClick(profileId: number): void {
    if (this.isSubscribed) {
      this.userProfilePopUp(profileId);
    } else {
      this.toast.info("Subscribe");
      this.router.navigateByUrl("/user/package");
    }
  }

  

  loadMatchCount() {
    this.service.findMatchCount().subscribe(res => {
      this.matchScores = res.matches.map((match: any) => match.matchScore);
      
      // Combine profiles with match scores
      this.dataSource.data = this.profiles.map((profile, index) => ({
        ...profile,
        matchScore: this.matchScores[index] || 'N/A'  // Use 'N/A' if no match score available
      }));
    });
  }

  
  closeChat(){
    this.showchat=true;
  }

  

  
  
  initiateChat(recipientId: number, profileName: string, profileImage: any) {
    console.log(`Initiating chat with recipientId: ${recipientId}, profileName: ${profileName}, profileImage: ${profileImage}`);
    this.router.navigate(['/user/chat'], {
      queryParams: { recipientId },
      state: { profileName, profileImage }
    });
  }

  startCall(profileId:number) {
    if(this.isSubscribed)
    this.router.navigate(['/user/video-call']);
    
  }


  
  

}
