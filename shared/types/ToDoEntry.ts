export enum Status {
  Open,
  Done,
  Deleted
}

export interface ToDoEntry {
  id: number;
  text: string;
  status: Status;
  creationDate: Date;
}