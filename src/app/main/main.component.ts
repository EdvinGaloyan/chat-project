import { Component } from '@angular/core';
import {User} from "../models/user";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public user:User;
  public userId:number

  public onConversationSelected(user:User){
    this.user = user;
  }

  public onUserIdSelected(userId: number) {
    this.userId=userId;
  }
}
