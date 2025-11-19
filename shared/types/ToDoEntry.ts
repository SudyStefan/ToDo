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

export interface ToDoEntry {
  id: number;
  text: string;
  status: ToDoStatus;
  creationDate: Date;
  type: ToDoType;
  lastChecked?: Date;
  period?: number; 
};