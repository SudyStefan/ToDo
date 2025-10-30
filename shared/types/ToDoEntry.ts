export enum Status {
  Open,
  Done,
  Deleted,
};

export enum Type {
  Single,
  Periodic,
};

export enum TimeInSeconds {
  Day = 60 * 60 * 24,
  Week = Day * 7,
}

export interface ToDoEntry {
  id: number;
  text: string;
  status: Status;
  creationDate: Date;
  type: Type;
  lastChecked?: Date;
  period?: number; 
};