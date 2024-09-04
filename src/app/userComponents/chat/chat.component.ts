import { Component, OnInit, OnDestroy, Input, AfterViewChecked, ViewChild, ElementRef, ChangeDetectorRef, AfterContentInit, HostListener } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { Subscription } from 'rxjs';
import { ChatService } from '../../service/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '@stomp/stompjs';
import { error } from 'console';
import { MatMenuTrigger } from '@angular/material/menu';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  isSubscribed = false;
  messages: any[] = [];
  newMessage = '';
  currentUserId!: number;
  recipientId!: number;
  selectedMessage!: number;
  isContextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };

  profileName: string = '';
  profileImage: any;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;

  private connectionSubscription!: Subscription;
  private messageSubscription!: Subscription;

  constructor(
    private service: ChatService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private toast: ToastrService,
    private dialog: MatDialog,
    private userService:UserService
  ) { }



  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }


  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      this.cdRef.detectChanges(); 
    } catch (err) { }
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.recipientId = Number(params['recipientId']);
      if (isNaN(this.recipientId)) {
        console.error('Invalid recipientId in URL parameters');
      } else {
        this.loadSubscription();
      }
    });


    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.profileName = navigation.extras.state['profileName'];
      this.profileImage = navigation.extras.state['profileImage'];
    } else {

      this.profileName = history.state.profileName;
      this.profileImage = history.state.profileImage;
    }

    this.service.onMessageRead().subscribe(receipt => {
      console.log(receipt+"receipt")
      if (receipt) {
        const message = this.messages.find(m => m.id === receipt.messageId);
        if (message) {
          message.read = true;
          this.cdRef.detectChanges(); 
        }
      }
    });

    this.service.onMessageDeleted().subscribe((deletedMessageId)=>{
      this.messages = this.messages.filter(m=>m.id !== deletedMessageId)
      this.cdRef.detectChanges()
    })


  }




  loadSubscription(): void {
    this.profileService.getProfile().subscribe(
      res => {
        if (res && typeof res.subscribed === 'boolean') {
          this.isSubscribed = res.subscribed;
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
    if (typeof localStorage !== 'undefined') {
      this.currentUserId = Number(localStorage.getItem('userId')) || 0;
    }

    this.service.connect(this.currentUserId.toString());

    this.connectionSubscription = this.service.isConnected().subscribe(
      connected => {
        if (connected) {
          this.loadMessages();
          // this.markAllMessagesAsRead();
        }
      }
    );

    this.messageSubscription = this.service.onMessage().subscribe(
      message => {
        if (message) {
          if (message.senderId !== this.currentUserId) {
              const newMessage = {...message,read:false};
              this.messages.push(newMessage);
              this.scrollToBottom();
              this.showNotification(message);
            // if(message.content === null|| message.content === ''){
            //   this.messages = this.messages.filter(m => m.id !== message.id);
              
            //   this.showNotification('message is deleted');
            // }else{
            //   const newMessage = { ...message, read: false };
            //   this.messages.push(message);
            //   this.scrollToBottom();
            //   this.showNotification(message);
            //   this.markMessageAsRead(newMessage.id);



            // }
            // this.cdRef.detectChanges();
          }
        }
      }
    );
  }

  markAllMessagesAsRead(): void {
    this.messages.forEach(message => {
      if (!message.read && message.recipientId === this.currentUserId) {
        this.markMessageAsRead(message.id);
      }
    });
  }



  sendMessage(): void {
    if (this.isSubscribed) {
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
    }else{
      this.toast.info("Subscribe");
      this.router.navigateByUrl("/user/package")
    }
  }

  loadMessages(): void {
    this.service.getInitialMessages(this.currentUserId, this.recipientId)
      .subscribe(
        messages => {
          this.messages = messages.map(message => ({
            ...message,
            read: message.read || message.senderId !== this.currentUserId
          }));
          
          this.messages
          .filter(message => !message.read && message.senderId !== this.currentUserId)
          .forEach(message => this.markMessageAsRead(message.id));

          this.cdRef.detectChanges(); // Trigger change detection
        },
        error => {
          console.error('Error loading initial messages:', error);
        }
      );
  }

  


  public onRightClick(event: MouseEvent, messageId: number) {

    event.preventDefault();
    
    this.selectedMessage = messageId;
    const targetElement = event.target as HTMLElement;
    const rect = targetElement.getBoundingClientRect();
    this.contextMenuPosition = { x: rect.left, y: rect.bottom };
    this.isContextMenuVisible = true;
  }

  deleteMessage(messageId: number) {
    console.log(this.selectedMessage + "jhjkl");
    if (!this.selectedMessage) {
      return;
    }
    if (confirm("Are you sure you want to delete the message?")) {
      this.service.delete(this.selectedMessage).subscribe(() => {
        this.messages = this.messages.filter(m => m.id !== this.selectedMessage);
        this.isContextMenuVisible = false;
        
      
        this.cdRef.detectChanges();
      },
      error => {
        console.error('Error deleting message:', error);
      });
    } else {
      this.isContextMenuVisible = false;
    }
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


  showNotification(message: any) {
    this.toast.info(`New message: ${message.content}`, 'New Message');
  }


  markMessageAsRead(messageId: number): void {
    this.service.markMessageAsRead(messageId).subscribe(
      () => {
        const message = this.messages.find(m => m.id === messageId);
        if (message) {
          message.read = true;
          this.cdRef.detectChanges(); // Trigger change detection
        }
      },
      // error => {
      //   console.error('Error marking message as read:', error);
      // }
    );
  }
  
  isUrl(str: string): boolean {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!urlPattern.test(str);
  }

  startCall(): void {
    if (this.isSubscribed) {
     this.userService.createChatRoom().subscribe(
        roomName => {
          const callNotification = {
            senderId: this.currentUserId,
            recipientId: this.recipientId,
            content:  `https://meet.jit.si/${roomName}`,
            timeStamp: new Date(),
          };
  
          this.service.sendMessage(callNotification)
            .then(() => {
              this.router.navigate(['/user/video-call'], { queryParams: { recipientId: this.recipientId, roomName } });
            })
            .catch(error => {
              console.error('Error sending video call notification:', error);
              this.toast.error('Failed to initiate video call.');
            });
        },
        error => {
          console.error('Error creating chat room:', error);
          this.toast.error('Failed to create video call room.');
        }
      );
    } else {
      this.toast.info('Subscribe to initiate a video call.');
      this.router.navigateByUrl('/user/package');
    }
  }
  
 
  
  
  
  

}