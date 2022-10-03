import { Component } from '@angular/core';
import {Conversation} from "../models/conversation";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public conversation:Conversation;
  public userId:number

  public onConversationSelected(conversation:Conversation){
    this.conversation = conversation;
  }

  public onUserIdSelected(userId: number) {
    this.userId=userId;
  }
}
