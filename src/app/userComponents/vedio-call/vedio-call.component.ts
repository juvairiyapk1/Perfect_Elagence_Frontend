import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.token = localStorage.getItem('jwtToken') || null;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.room = params['roomName']; // Retrieve room name from query params
      this.initializeJitsiMeet();
    });
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