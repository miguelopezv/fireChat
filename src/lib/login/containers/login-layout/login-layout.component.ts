import { Component } from '@angular/core';
import { ChatService } from 'src/lib/services/chat.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html'
})
export class LoginLayoutComponent {
  constructor(private chatService: ChatService) {}

  login(service: string) {
    this.chatService.login(service);
  }
}
