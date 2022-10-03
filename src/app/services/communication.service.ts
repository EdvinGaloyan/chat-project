import { Injectable } from '@angular/core';
import {ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private _subject = new ReplaySubject<number>()


  get subject(): Subject<number> {
    return this._subject;
  }

  sendMessage(message: number) {
    this._subject.next(message);
  }
}
