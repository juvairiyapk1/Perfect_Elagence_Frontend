import { Component, OnInit, OnDestroy, Input, AfterViewChecked, ViewChild, ElementRef, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { Subscription } from 'rxjs';
import { ChatService } from '../../service/chat.service';
import { ActivatedRoute,  Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy,AfterViewChecked {
  isSubscribed = false;
  messages: any[] = [];
  newMessage = '';
   currentUserId!: number;
  recipientId!: number;

  profileName: string ='';
  profileImage: any;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  
  private connectionSubscription!: Subscription;
  private messageSubscription!: Subscription;

  constructor(
    private service:ChatService,
    private profileService: ProfileService,
    private route:ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private router:Router
  ) {}

  

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }


  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      this.cdRef.detectChanges(); // Manually trigger change detection
    } catch(err) { }
  }
  

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.recipientId = Number(params['recipientId']);
      if (isNaN(this.recipientId)) {
        console.error('Invalid recipientId in URL parameters');
        // Handle the error (e.g., navigate back or show an error message)
      } else {
        this.loadSubscription();
      }
    });


    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.profileName = navigation.extras.state['profileName'];
      this.profileImage = navigation.extras.state['profileImage'];
    } else {
      // Fallback to history.state if Router.getCurrentNavigation() is null
      this.profileName = history.state.profileName;
      this.profileImage = history.state.profileImage;
    }

    console.log('Profile Name:', this.profileName);
    console.log('Profile Image:', this.profileImage);

    
  }


  
  loadSubscription(): void {
    this.profileService.getProfile().subscribe(
      res => {
        if (res && typeof res.subscribed === 'boolean') {
          this.isSubscribed = res.subscribed;
          console.log(this.isSubscribed);
          if (this.isSubscribed) {
            this.initializeChat();
          }
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error => {
        console.error('Error fetching profile subscription status:', error);
      }
    );
  }

  initializeChat(): void {
    // Assuming you have a way to get the current user ID
    if(typeof localStorage !== 'undefined'){
      this.currentUserId = Number(localStorage.getItem('userId')) || 0;
        }

    this.service.connect(this.currentUserId.toString());

    this.connectionSubscription = this.service.isConnected().subscribe(
      connected => {
        if (connected) {
          this.loadMessages();
        }
      }
    );

    this.messageSubscription = this.service.onMessage().subscribe(
      message => {
        if (message && message.senderId !== this.currentUserId) {
          this.messages.push(message);
          this.scrollToBottom();
        }
      }
    );
  }

  

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message = {
        senderId: this.currentUserId,
        recipientId: this.recipientId,
        content: this.newMessage,
        timeStamp: new Date() // Add timestamp
      };
      
      // Add message to local array immediately
      this.messages.push(message);
      
      this.service.sendMessage(message)
        .then(() => {
          console.log('Message sent');
          this.newMessage = '';
          this.scrollToBottom();
        })
        .catch(error => {
          console.error('Error sending message:', error);
          // Optionally, remove the message from the array if sending fails
          this.messages.pop();
        });
    }
  }

  loadMessages(): void {
    this.service.getInitialMessages(this.currentUserId, this.recipientId)
      .subscribe(
        messages => {
          this.messages = messages;
        },
        error => {
          console.error('Error loading initial messages:', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.service.disconnect();
    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
    }
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }


  

  
}