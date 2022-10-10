import {Component} from '@angular/core';
import {User} from "../models/user";
import {Channel} from "../models/channel";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public entity: User | Channel;
  public entityId: number;

  public onConversationClicked(entity: User | Channel): void {
    this.entity = entity;
  }

  public onEntityIdSelected(entityId: number): void {
    this.entityId = entityId;
  }
}
