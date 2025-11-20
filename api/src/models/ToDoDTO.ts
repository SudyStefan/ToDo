export enum ToDoStatus {
  Open,
  Done,
  Deleted,
};

export enum ToDoType {
  Single,
  Periodic,
};

export enum TimeInSeconds {
  Day = 60 * 60 * 24,
  Week = Day * 7,
}

export interface ToDoEntryDTO {
  _id?: string,
  text: string,
  status: number, 
  creationDate: string,
  type: number,
  lastChecked?: string,
  period?: number,
  deleted: boolean,
}