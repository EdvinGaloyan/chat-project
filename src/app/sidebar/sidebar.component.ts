import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CommunicationService} from "../services/communication.service";
import {Subject, takeUntil} from "rxjs";
import {DataService} from "../services/data.service";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {Channel} from "../models/channel";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnDestroy, OnInit {

  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  @Output() entityIdSelected: EventEmitter<any> = new EventEmitter();

  public searchText: string;
  private $destroySubject = new Subject<boolean>();
  public users: User[];
  public isLogoutWindowOpen: boolean;
  private userId;
  public userName;
  public channels: Channel[];

  constructor(private communicationService: CommunicationService,
              private dataService: DataService,
              private route: Router) {
    this.communicationService.subject.pipe(takeUntil(this.$destroySubject)).subscribe(userId => {
      this.userId = userId;
      this.getChatUsers(userId);
      this.getChannelsInWhichUserIsIncluded(userId);
    });
  }

  ngOnInit(): void {
    if (this.users) {
      this.userName = this.dataService.getUserById(this.userId).firstName;
    } else
      this.route.navigate(['/login']);
  }

  private getChatUsers(userId): void {
    this.users = this.dataService.getChatUsers(userId);
  }

  get filteredConversations(): User[] {
    return this.users.filter((user) => {
      return (
        user.firstName
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        user.lastName
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    });
  }

  get filteredChannels(): Channel[] {
    return this.channels.filter(channel => {
      return channel.name.toLowerCase().includes(this.searchText.toLowerCase());
    })
  }

  public logout(): void {
    this.isLogoutWindowOpen = !this.isLogoutWindowOpen;
  }

  public onConversationClick(entity): void {
    this.conversationClicked.emit(entity);
    this.entityIdSelected.emit(this.userId);
  }

  ngOnDestroy(): void {
    this.$destroySubject.next(true);
    this.$destroySubject.complete();
  }

  private getChannelsInWhichUserIsIncluded(userId: number):void {
    this.channels = this.dataService.getChannelsInWhichUserIsIncluded(userId);
  }
}
