import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CommunicationService} from "../services/communication.service";
import {Subject, takeUntil} from "rxjs";
import {DataService} from "../services/data.service";
import {User} from "../models/user";
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
  private $destroySubject: Subject<boolean>;
  public users;
  public isLogoutWindowOpen: boolean;
  private userId;
  public userName;

  constructor(private communicationService: CommunicationService,
              private dataService: DataService,
              private route: Router) {
    this.$destroySubject = new Subject<boolean>();
    this.communicationService.subject.pipe(takeUntil(this.$destroySubject)).subscribe(userId => {
      this.userId = userId;
      this.getChatUsers(userId);
    });
  }

  ngOnInit(): void {
    this.users || this.route.navigate(['/login']);
    this.userName = this.dataService.getUserById(this.userId).firstName;
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

  public logout(): void {
    this.isLogoutWindowOpen = !this.isLogoutWindowOpen;
  }

  public onUserClick(user) {
    this.conversationClicked.emit(user);
    this.userIdSelected.emit(this.userId);
  }

  ngOnDestroy(): void {
    this.$destroySubject.next(true);
    this.$destroySubject.complete();
  }
}
