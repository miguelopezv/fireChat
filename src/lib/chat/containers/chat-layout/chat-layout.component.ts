import { Component, ViewChild, OnInit } from '@angular/core';
import { ChatService } from 'src/lib/services/chat.service';
import { Message } from 'src/lib/interfaces/message.interface';

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss']
})
export class ChatLayoutComponent implements OnInit {
  @ViewChild('input', { static: true }) input: any;
  @ViewChild('appMessages', { static: true }) chat: any;

  chats: Message[];

  constructor(private chatService: ChatService) {
    this.chatService.loadMessages().subscribe(messages => {
      this.chats = messages.reverse();
      setTimeout(() => {
        this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
      });
    });
  }

  ngOnInit() {}

  sendMessage(message: string) {
    if (message.length) {
      this.chatService
        .addMessage({ message })
        .then(() => (this.input.nativeElement.value = ''))
        .catch(err => console.error(err));
    }
  }
}
