import {Injectable} from '@angular/core';
import {Message} from "../models/message";
import {User} from "../models/user";
import {Channel} from "../models/channel";

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private channels: Channel[] = [
    {
      id: 9,
      name: 'First Channel',
      date: new Date("09/01/2022"),
      userIds: [1, 6, 5],
      messages: []
    },
    {
      id: 10,
      name: 'Second Channel',
      date: new Date("08/28/2021"),
      userIds: [2, 1, 6],
      messages: []
    },
    {
      id: 11,
      name: 'Third Channel',
      date: new Date("6/24/2022"),
      userIds: [2, 1, 5],
      messages: []
    },
    {
      id: 12,
      name: 'Fourth Channel',
      date: new Date("09/11/2020"),
      userIds: [3, 5, 4],
      messages: []
    },
  ]
  private users: User[] = [
    {
      id: 6,
      firstName: 'Natali',
      lastName: 'Portman',
      date: new Date("09/01/2022"),
      messages: [],
    },
    {
      id: 1,
      firstName: 'Anthony',
      lastName: 'Hopkins',
      date: new Date("09/02/2022"),
      messages: [],
    },
    {
      id: 2,
      firstName: 'Oscar',
      lastName: 'Wilde',
      date: new Date("08/28/2021"),
      messages: [],
    },
    {
      id: 3,
      firstName: 'Andrew',
      lastName: 'Carnegie',
      date: new Date("01/09/1902"),
      messages: [],
    },
    {
      id: 3,
      firstName: 'Nikola',
      lastName: 'Tesla',
      date: new Date("01/05/1894"),
      messages: [],
    },
    {
      id: 4,
      firstName: 'Tomas',
      lastName: 'Jeferson',
      date: new Date("01/09/2022"),
      messages: [],
    },
    {
      id: 5,
      firstName: 'Tom',
      lastName: 'Hardy',
      date: new Date("03/31/2022"),
      messages: [],
    },
  ];

  public getUserByFirstAndLastName(firstName: string, lastName: string): User {
    this.users = JSON.parse(localStorage.getItem('users'));
    return this.users.find(user => user.firstName === firstName && user.lastName === lastName);
  }

  public getChatUsers(userId: number): User[] {
    const users = localStorage.getItem('users')
    return JSON.parse(users).filter(user => user.id != userId);
  }

  public getChannelsInWhichUserIsIncluded(userId: number): Channel[] {
    const channels = localStorage.getItem('channels')
    return JSON.parse(channels).filter(channel => channel.userIds.includes(userId));
  }

  public setUsersToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  public setChannelsToLocalStorage(): void {
    localStorage.setItem('channels', JSON.stringify(this.channels));
  }

  public getUserById(userId: number): User {
    return JSON.parse(localStorage.getItem('users')).find(user => user.id === userId);
  }

  public getChannelById(channelId: number): Channel {
    return JSON.parse(localStorage.getItem('channels')).find(channel => channel.id === channelId);
  }

  public setMessage(message: Message, id: number) {
    this.users.forEach(user => {
      if (user.id === id) {
        user.messages.unshift(message);
      }
    });
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  public setMessageToChannel(message: Message, id: number) {
    this.channels.forEach(channel => {
      if (channel.id === id) {
        channel.messages.unshift(message);
      }
    })
    localStorage.setItem('channels', JSON.stringify(this.channels));
  }
}
