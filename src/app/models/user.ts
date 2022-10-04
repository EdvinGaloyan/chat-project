import {Message} from "./message";

export interface User {
  id: number
  firstName: string
  lastname: string,
  date: string
  messages: Message[];
}
