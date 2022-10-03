import {Injectable} from '@angular/core';
import {Message} from "../models/message";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private conversations = [
    {
      id: 6,
      firstName: 'Natali',
      lastName: 'Portman',
      date: new Date("09/01/2022").toDateString(),
      latestMessage: 'Hi!!',
      messages: [],
    },
    {
      id: 1,
      firstName: 'Anthony',
      lastName: 'Hopkins',
      date: new Date("09/02/2022").toDateString(),
      latestMessage: 'Hello',
      messages: [],
    },
    {
      id: 2,
      firstName: 'Oscar',
      lastName: 'Wilde',
      date: new Date("08/28/2021").toDateString(),
      latestMessage: 'Greetings',
      messages: [],
    },
    {
      id: 3,
      firstName: 'Andrew',
      lastName: 'Carnegie',
      date: new Date("01/09/1902").toDateString(),
      latestMessage: 'Maybe!!',
      messages: [],
    },
    {
      id: 3,
      firstName: 'Nikola',
      lastName: 'Tesla',
      date: new Date("01/05/1894").toDateString(),
      latestMessage: 'Please change contract',
      messages: [],
    },
    {
      id: 4,
      firstName: 'Tomas',
      lastName: 'Jeferson',
      date: new Date("01/09/2022").toDateString(),
      latestMessage: "Goodbye",
      messages: [],
    },
    {
      id: 5,
      firstName: 'Tom',
      lastName: 'Hardy',
      date: new Date("03/31/2022").toDateString(),
      latestMessage: 'Congratulations',
      messages: [],
    },
  ];

  public getUserByFirstAndLastName(firstName: string, lastName: string) {
    return this.conversations.find(user => user.firstName === firstName && user.lastName === lastName);
  }

  public getChatUsers(userId) {
    return this.conversations.filter(user => user.id != userId);
  }

  public setMessage(message: Message, id: number) {
    this.conversations.forEach(user => {
      if (user.id === id) {
        user.messages.unshift(message);
        user.latestMessage = message.body
      }
    });
  }
}
