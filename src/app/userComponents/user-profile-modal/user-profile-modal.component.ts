import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PROFILEBYUSER } from '../../model/Interface';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrl: './user-profile-modal.component.scss'
})
export class UserProfileModalComponent implements OnInit {

  profile:PROFILEBYUSER = {};


  constructor(private dialogRef: MatDialogRef<UserProfileModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { userId:number},
               private service:UserService) { }
  ngOnInit(): void {
    this.loadUserProfile();
  }

              loadUserProfile(): void {
                console.log(this.data.userId+"userid.....")
                this.service.getUserById(this.data.userId).subscribe(
                  (profile: PROFILEBYUSER) => {
                    this.profile = profile;
                  },
                  error => {
                    console.error('Error fetching user profile:', error);
                  }
                );
              }

              closeDialog(): void {
                this.dialogRef.close();
              }
}
