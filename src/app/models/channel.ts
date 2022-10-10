import {Message} from "./message";

export interface Channel {
  id:number;
  name:string;
  date:Date;
  userIds:number[];
  messages:Message[];
}
