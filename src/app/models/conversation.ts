import {Message} from "./message";

export interface Conversation {
  id: number
  firstName: string
  lastname: string,
  date: string
  latestMessage: string
  messages: Message[];
}
