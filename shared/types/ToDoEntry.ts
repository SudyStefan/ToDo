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
  _id: string;
  text: string;
  status: ToDoStatus;
  creationDate: Date;
  type: ToDoType;
  lastChecked?: Date;
  period?: number; 
};

export interface ToDoEntryDTO {
  _id: string,
  text: string,
  status: number, 
  creationDate: string,
  type: number,
  lastChecked?: string,
  period?: number,
}

export const fromDTO = (dto: ToDoEntryDTO): ToDoEntry => {
  return {
    ...dto,
    creationDate: new Date(dto.creationDate),
    lastChecked: dto.lastChecked ? new Date(dto.lastChecked) : undefined,
  }
};

export const toDTO = (entry: ToDoEntry): ToDoEntryDTO => {
  return {
    ...entry,
    creationDate: entry.creationDate.toISOString(),
    lastChecked: entry.lastChecked ? entry.lastChecked.toISOString() : undefined,
  }
};