import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-vedio-call',
  templateUrl: './vedio-call.component.html',
  styleUrl: './vedio-call.component.scss'
})
export class VedioCallComponent implements OnInit {
  private apiUrl = 'http://localhost:8080/user';

  domain: string = 'meet.jit.si';
  room: string = '';
  options: any;
  api: any;
  token: string | null;

  constructor(private http: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('jwtToken')
    } else {
      this.token = null;
    }
  }

  ngOnInit() {
    this.createRoom();
  }

  createRoom() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.post<{ roomName: string }>(
      `${this.apiUrl}/video-call/create-room`,
      {},
      { headers }
    ).subscribe(
      (response) => {
        this.room = response.roomName;
        this.initializeJitsiMeet();
      },
      (error) => console.error('Error creating room:', error)
    );
  }

  initializeJitsiMeet() {
    this.options = {
      roomName: this.room,
      width: 700,
      height: 700,
      parentNode: document.querySelector('#jitsi-container')
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
  }
}