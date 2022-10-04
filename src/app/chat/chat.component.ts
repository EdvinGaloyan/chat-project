import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from "../models/user";
import {DataService} from "../services/data.service";
import {Message} from "../models/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnChanges, OnInit {
  @Input() user: User;
  @Input() userId: number;
  public message = '';
  messages: Message[];
  public senderName: string;

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.senderName = this.dataService.getUserById(this.userId).firstName;
  }

  public submitMessage(event: any): void {
    let value = event.target.value.trim();
    this.message = '';
    if (value.length < 1) return;
    this.user.date = new Date().toDateString();
    const senderMessage: Message = {
      id: this.userId,
      body: value,
      date: new Date().toDateString(),
      me: true
    }
    const receiverMessage: Message = {
      id: this.user.id,
      body: value,
      date: new Date().toDateString(),
      me: false
    }
    this.dataService.setMessage(senderMessage, this.user.id);
    this.dataService.setMessage(receiverMessage, this.userId);
    this.setDataToDataSource(this.user.id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setDataToDataSource(this.user.id)
  }

  private setDataToDataSource(userId ?: number) {
    this.user = this.dataService.getUserById(userId);
    this.messages = this.user.messages.filter(message => message.id === this.userId);
  }
}
