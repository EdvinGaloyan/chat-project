import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CommunicationService} from "../services/communication.service";
import {Subject, takeUntil} from "rxjs";
import {DataService} from "../services/data.service";
import {Conversation} from "../models/conversation";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnDestroy, OnInit {

  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  @Output() userIdSelected: EventEmitter<any> = new EventEmitter();

  public searchText: string;
  private $destroySubject = new Subject<string>()
  public conversations;
  public isLogoutWindowOpen: boolean;
  private userId

  constructor(private communicationService: CommunicationService,
              private dataService: DataService,
              private route: Router) {

    this.communicationService.subject.pipe(takeUntil(this.$destroySubject)).subscribe(userId => {
      this.userId = userId;
      this.getChatUsers(userId);
    });
  }

  ngOnInit(): void {
    this.conversations || this.route.navigate(['/login']);

  }

  private getChatUsers(userId): void {
    this.conversations = this.dataService.getChatUsers(userId);
  }

  get filteredConversations(): Conversation[] {
    return this.conversations.filter((conversation) => {
      return (
        conversation.firstName
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        conversation.latestMessage
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
        || conversation.lastName
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    });
  }

  public logout(): void {
    this.isLogoutWindowOpen = !this.isLogoutWindowOpen;
  }

  ngOnDestroy(): void {
    this.$destroySubject.complete();
    this.$destroySubject.unsubscribe();
  }

  public onUserClick(conversation) {
    this.conversationClicked.emit(conversation);
    this.userIdSelected.emit(this.userId);
  }
}
