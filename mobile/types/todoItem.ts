export enum TodoStatus {
  OPEN = "OPEN",
  DONE = "DONE",
  DELETED = "DELETED"
}

export enum TodoType {
  SINGLE = "SINGLE",
  PERIODIC = "PERIODIC"
}

export enum TimeInSeconds {
  DAY = 60 * 60 * 24,
  WEEK = DAY * 7
}

export interface TodoEntryDTO {
  id: string,
  text: string,
  description?: string,
  status: string, 
  creationDate: string,
  type: string,
  lastChecked?: string,
  periodSeconds?: number,
}

export interface TodoItem {
  id: string;
  text: string;
  description?: string;
  status: TodoStatus;
  creationDate: Date;
  type: TodoType;
  lastChecked?: Date;
  periodSeconds?: number; 
}

