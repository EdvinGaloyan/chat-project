import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private _subject = new ReplaySubject<number>()


  get subject(): Subject<number> {
    return this._subject;
  }

  public notifyOnTopic(userId: number): void {
    this._subject.next(userId);
  }
}
