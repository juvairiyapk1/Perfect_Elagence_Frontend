import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import Peer from 'simple-peer';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class CallingService {
  private stompClient: Client;
  private peer!: Peer.Instance;
  private stream!: MediaStream;
  private userId: string | null;
  private incomingCallSubject = new Subject<{ callerId: string, offer: string }>();
  private remoteStream: MediaStream | null = null;
  private remoteStreamReady = new Subject<boolean>();

  constructor() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/user/ws',
      webSocketFactory: () => new SockJS('http://localhost:8080/user/ws'),
      connectHeaders: {},
      debug: (str) => {
        console.log(str);
      },
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/user/queue/call', (message) => {
        this.handleSignalingMessage(JSON.parse(message.body));
      });
    };

    this.stompClient.activate();

    if (typeof localStorage !== 'undefined') {
      this.userId = localStorage.getItem('userId');
    } else {
      this.userId = null;
    }
  }

  private send(message: any) {
    this.stompClient.publish({
        destination: '/app/call',
        body: JSON.stringify(message)
    });
}

private handleSignalingMessage(msg: any) {
    console.log('Signaling message received:', msg);
    switch (msg.type) {
      case 'call_initiation':
        console.log('Call initiation from:', msg.sender);
        this.incomingCallSubject.next({ callerId: msg.sender, offer: msg.payload });
        break;
      case 'offer':
        console.log('Offer received:', msg.payload);
        this.answerCall(msg.sender, msg.payload);
        break;
      case 'answer':
        console.log('Answer received:', msg.payload);
        this.peer.signal(JSON.parse(msg.payload));
        break;
      case 'ice-candidate':
        console.log('ICE candidate received:', msg.payload);
        if (this.peer) {
          this.peer.signal(JSON.parse(msg.payload));
        }
        break;
    }
  }

async startCall(calleeId: string) {
     
  await this.ensureConnection();

    this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.peer = new Peer({ 
        initiator: true, 
        stream: this.stream, 
        trickle: false,
        config: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:global.stun.twilio.com:3478' }
            ]
        }
    });

    this.peer.on('signal', data => {
        this.send({
            type: 'offer',
            sender: this.userId,
            receiver: calleeId,
            payload: JSON.stringify(data)
        });
    });

    this.peer.on('stream', (stream: MediaStream) => {
        console.log('Remote stream received', stream);
        this.remoteStream = stream;
        this.remoteStreamReady.next(true);
    });

    this.peer.on('ice', (iceCandidate) => {
        console.log('ICE candidate', iceCandidate);
        this.send({
            type: 'ice-candidate',
            sender: this.userId,
            receiver: calleeId,
            payload: JSON.stringify(iceCandidate)
        });
    });

    this.send({
        type: 'call_initiation',
        sender: this.userId,
        receiver: calleeId,
        payload: null
    });
}

async answerCall(callerId: string, offer: string) {
    this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.peer = new Peer({ 
        initiator: false, 
        stream: this.stream, 
        trickle: false,
        config: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:global.stun.twilio.com:3478' }
            ]
        }
    });

    this.peer.on('signal', data => {
        this.send({
            type: 'answer',
            sender: this.userId,
            receiver: callerId,
            payload: JSON.stringify(data)
        });
    });

    this.peer.on('stream', (stream: MediaStream) => {
        console.log('Remote stream received', stream);
        this.remoteStream = stream;
        this.remoteStreamReady.next(true);
    });

    this.peer.on('ice', (iceCandidate) => {
        console.log('ICE candidate', iceCandidate);
        this.send({
            type: 'ice-candidate',
            sender: this.userId,
            receiver: callerId,
            payload: JSON.stringify(iceCandidate)
        });
    });

    this.peer.signal(JSON.parse(offer));
}

endCall() {
    if (this.peer) {
        this.peer.destroy();
    }
    if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
    }
    if (this.stompClient && this.stompClient.connected) {
        this.stompClient.deactivate();
    }
}

onIncomingCall(): Observable<{ callerId: string, offer: string }> {
    return this.incomingCallSubject.asObservable();
}

getLocalStream(): MediaStream | undefined {
    return this.stream;
}

getRemoteStream(): MediaStream | null {
    return this.remoteStream;
}

onRemoteStreamReady(): Observable<boolean> {
    return this.remoteStreamReady.asObservable();
}

getOngoingCall(): boolean {
  return !!this.peer;
}

private ensureConnection(): Promise<void> {
  if (this.stompClient.connected) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const checkConnection = () => {
      if (this.stompClient.connected) {
        resolve();
      } else {
        setTimeout(checkConnection, 100);
      }
    };
    checkConnection();
  });
}
}
