export enum TodoStatus {
  OPEN,
  DONE,
  DELETED,
};

export enum TodoType {
  SINGLE,
  PERIODIC,
};

export enum TimeInSeconds {
  DAY = 60 * 60 * 24,
  WEEK = DAY * 7,
}

export interface TodoEntryDTO {
  id: string,
  text: string,
  status: TodoStatus, 
  creationDate: string,
  type: TodoType,
  lastChecked?: string,
  period?: number,
}