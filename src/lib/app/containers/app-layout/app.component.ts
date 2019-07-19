import { Component } from '@angular/core';
import { ChatService } from 'src/lib/services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public chatService: ChatService) {}
}
