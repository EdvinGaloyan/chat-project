import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataService} from "../services/data.service";
import {Message} from "../models/message";
import {Type} from "../models/type";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnChanges, OnInit {
  @Input() entity: any;
  @Input() entityId: number;
  public message = '';
  public messages: Message[];
  public senderName: string;
  public modelType: Type;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.senderName = this.dataService.getUserById(this.entityId).firstName;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setMessagesToChat(this.entity.id)
  }

  public submitMessage(event: any): void {
    let value = event.target.value.trim();
    this.message = '';
    if (value.length < 1) return;
    this.entity.date = new Date();
    const senderMessage: Message = {
      userId: this.entityId,
      body: value,
      date: new Date(),
      me: true
    }
    if (this.modelType === 1) {
      this.dataService.setMessageToChannel(senderMessage, this.entity.id);
    }
    const receiverMessage: Message = {
      userId: this.entity.id,
      body: value,
      date: new Date(),
      me: false
    }
    this.dataService.setMessage(senderMessage, this.entity.id);
    this.dataService.setMessage(receiverMessage, this.entityId);
    this.setMessagesToChat(this.entity.id);
  }

  private setMessagesToChat(entityId ?: number): void {
    if (!this.entity.userIds) {
      this.modelType = Type.USER;
      this.entity = this.dataService.getUserById(entityId);
      this.messages = this.entity.messages.filter((message: Message) => message.userId === this.entityId);
    } else {
      this.modelType = Type.CHANNEL;
      this.entity = this.dataService.getChannelById(entityId);
      this.messages = this.entity.messages;
    }
  }

  public getUserNameById(userId: number): string {
    return this.dataService.getUserById(userId).firstName;
  }
}
