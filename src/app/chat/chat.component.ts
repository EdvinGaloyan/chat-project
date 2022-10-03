import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Conversation} from "../models/conversation";
import {DataService} from "../services/data.service";
import {Message} from "../models/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnChanges {
  @Input() conversation: Conversation;
  @Input() userId: number;
  public message = '';
  messages: Message[];

  constructor(private dataService: DataService) {

  }

  public submitMessage(event: any): void {
    let value = event.target.value.trim();
    this.message = '';
    if (value.length < 1) return;
    this.conversation.date = new Date().toDateString();
    const senderMessage: Message = {
      id: this.userId,
      body: value,
      date: new Date().toDateString(),
      me: true
    }
    const message: Message = {
      id: this.conversation.id,
      body: value,
      date: new Date().toDateString(),
      me: false
    }
    this.dataService.setMessage(senderMessage, this.conversation.id);
    this.dataService.setMessage(message, this.userId);
    this.setDataToDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setDataToDataSource()
  }

  private setDataToDataSource() {
    this.messages = this.conversation.messages.filter(message => message.id === this.userId);

  }
}
