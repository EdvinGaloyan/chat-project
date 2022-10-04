import {Injectable} from '@angular/core';
import {Message} from "../models/message";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private users = [
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

  public getUserByFirstAndLastName(firstName: string, lastName: string) {
    this.users = JSON.parse(localStorage.getItem('data'));
    return this.users.find(user => user.firstName === firstName && user.lastName === lastName);
  }

  public getChatUsers(userId) {
    const data = localStorage.getItem('data')
    return JSON.parse(data).filter(user => user.id != userId);
  }

  public setMessage(message: Message, id: number) {
    this.users.forEach(user => {
      if (user.id === id) {
        user.messages.unshift(message);
      }
    });
    localStorage.setItem('data', JSON.stringify(this.users));
  }

  public setUsersToLocalStorage() {
    localStorage.setItem('data', JSON.stringify(this.users));
  }

  public getUserById(userId: number): User {
    return JSON.parse(localStorage.getItem('data')).find(user => user.id === userId);
  }
}
