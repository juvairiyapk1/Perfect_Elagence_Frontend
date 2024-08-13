import { Component, OnDestroy, OnInit } from '@angular/core';
import { CallingService } from '../../service/calling.service';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.scss'
})
export class VideoCallComponent implements OnInit,OnDestroy{

  isAudioEnabled = true;
  isVideoEnabled = true;

 constructor(private videoCallService: CallingService) {}

 ngOnInit() {
  // Set up local video
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
        localVideo.srcObject = stream;
      });
      
  // Listen for incoming calls
  this.videoCallService.onIncomingCall().subscribe(incomingCall => {
    // Show UI to accept/reject call
    if (confirm(`Incoming call from ${incomingCall.callerId}. Accept?`)) {
      this.videoCallService.answerCall(incomingCall.callerId, incomingCall.offer)
    }
  });

  this.videoCallService.onRemoteStreamReady().subscribe(()=>{
    this.setupRemoteVideo();
  });

  const ongoingCall = this.videoCallService.getOngoingCall();
  if (ongoingCall) {
    // Setup UI for ongoing call
  } else {
    // Listen for incoming calls
    this.videoCallService.onIncomingCall().subscribe(/* ... */);
  }
}
  
setupRemoteVideo() {
  console.log('Setting up remote video');
  const remoteStream = this.videoCallService.getRemoteStream();
  if (remoteStream) {
    const remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
    if (remoteVideo) {
      console.log('Remote video element found, setting srcObject');
      remoteVideo.srcObject = remoteStream;
    } else {
      console.error('Remote video element not found');
    }
  } else {
    console.error('Remote stream not available');
  }
}

  endCall() {
    console.log("endcall")
    this.videoCallService.endCall();
  }

  ngOnDestroy() {
    this.videoCallService.endCall();
  }


  toggleAudio() {
    this.isAudioEnabled = !this.isAudioEnabled;
    const audioTrack = this.videoCallService.getLocalStream()?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = this.isAudioEnabled;
    }
  }

  toggleVideo() {
    this.isVideoEnabled = !this.isVideoEnabled;
    const videoTrack = this.videoCallService.getLocalStream()?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = this.isVideoEnabled;
    }
  }

}
