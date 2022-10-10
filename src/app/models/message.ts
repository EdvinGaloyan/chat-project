export interface Message {
  userId: number;
  body: string;
  date: Date;
  me?: boolean;
}
