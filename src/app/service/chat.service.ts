import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private client: Client | null = null;
  private isConnectedSubject = new BehaviorSubject<boolean>(false);
  private messageSubject = new BehaviorSubject<any>(null);
  private messageDeletedSubject = new BehaviorSubject<string | null>(null);
  private messageReadSubject = new BehaviorSubject<any>(null);

  constructor(private http:HttpClient) {

  }

  private apiUrl ='http://localhost:8080/user';
  private newMessageCount = 0;

  connect(userId: string): void {
  this.client = new Client({
    webSocketFactory: () => new SockJS('http://localhost:8080/user/ws'),
    connectHeaders: {
      userId: userId,
    },
    debug: (str) => {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  this.client.onConnect = (frame) => {
    this.isConnectedSubject.next(true);
    console.log('Connected: ' + frame);

    // Subscribe to incoming messages
    this.client!.subscribe(`/user/${userId}/queue/messages`, this.onMessageReceived);

   // Subscribe to read receipt notifications
    this.client!.subscribe(`/user/${userId}/queue/message-read`, this.onReadReceiptReceived);

  };

  this.client.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
    this.isConnectedSubject.next(false);
  };

  this.client.onWebSocketError = (event) => {
    console.error('WebSocket error:', event);
    this.isConnectedSubject.next(false);
  };

  this.client.activate();
}

  disconnect(): void {
    if (this.client !== null) {
      this.client.deactivate();
    }
    this.isConnectedSubject.next(false);
  }

  sendMessage(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(this.isConnectedSubject+"kjhhjl")
      if (this.isConnectedSubject.value) {
        console.log('Sending message:', message);
        this.client!.publish({
          destination: '/app/chat',
          body: JSON.stringify(message),
        });
        console.log(message)
        resolve();
      } else {
        console.log('Not connected');
        reject(new Error('WebSocket is not connected'));
      }
    });
  }

  private onMessageReceived = (message: any) => {
    const notification = JSON.parse(message.body);
    console.log('Received message:', notification);
    this.messageSubject.next(notification);
  };

  

  isConnected(): Observable<boolean> {
    return this.isConnectedSubject.asObservable();
  }

  onMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  onMessageRead(): Observable<any> {
    console.log("onmessage read")
    return this.messageReadSubject.asObservable();
  }

  private onReadReceiptReceived = (message: any) => {
    console.log("hie heijoijlojl")
    const receipt = JSON.parse(message.body);
    this.messageReadSubject.next(receipt);
  };

  
  getInitialMessages(senderId: number, recipientId: number): Observable<any[]> {
    let headers = new HttpHeaders();
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    const url = `${this.apiUrl}/messages/${senderId}/${recipientId}`;
    return this.http.get<any[]>(url, { headers }).pipe(
      map(messages => messages.map(message => ({
        ...message,
        read: message.read || message.senderId !== senderId
      })))
    );
  }
  
  delete(id:any){
    let headers = new HttpHeaders();
    
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    const url = `${this.apiUrl}/message/${id}`;
    return this.http.delete<any>(url,{headers});
  
  }

  markMessageAsRead(messageId: number): Observable<any> {
    let headers = new HttpHeaders();
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    const url = `${this.apiUrl}/${messageId}/read`;
    return this.http.post<any>(url, {}, { headers });
  }


  

  
}