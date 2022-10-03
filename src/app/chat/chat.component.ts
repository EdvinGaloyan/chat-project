import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Conversation} from "../models/conversation";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() conversation: Conversation;
  public message = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  public submitMessage(event: any): void {
    let value = event.target.value.trim();
    this.message = '';
    if (value.length < 1) return;
    this.conversation.latestMessage = value;
    this.conversation.date = new Date().toDateString();
    this.conversation.messages.unshift({
      id: 1,
      body: value,
      date: new Date().toDateString(),
      me: true,
    });
  }
}
