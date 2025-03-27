import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-root',
  imports: [MatButtonModule,MatCardModule,CommonModule,FormsModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  socket: WebSocket | any;
  messages: { username: string, message: string }[] = [];
  newMessage: string = '';
  username: string = '';
  isUsernameSet: boolean = false;

  ngOnInit() {
    this.socket = new WebSocket('wss://backendchat-o5bi.onrender.com/ws');

    this.socket.onmessage = (event:any) => {
      let data = JSON.parse(event.data);
      
      if (data.type === "history") {
        this.messages = data.messages;
      } else {
        this.messages.push(data); 
      }
    };
  }

  setUsername() {
    if (this.username.trim()) {
      this.isUsernameSet = true;
    }
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      let chatMessage = {
        username: this.username,
        message: this.newMessage
      };

      this.socket.send(JSON.stringify(chatMessage)); 
      this.newMessage = ''; 
    }
  }

}  
