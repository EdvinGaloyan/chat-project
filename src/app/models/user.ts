import {Message} from "./message";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  date: Date;
  messages: Message[];
}
