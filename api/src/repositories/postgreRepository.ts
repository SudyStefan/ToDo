import { item_status, item_type, PrismaClient, todo_entry } from "@prisma/client";
import { TimeInSeconds, TodoCreateDTO, TodoEntryDTO, TodoStatus, TodoType } from "../models/todoEntryDTO.js";
import { Repository } from "./Repository.js";

const prisma = new PrismaClient();

class postgreRepository implements Repository {
  public name = "PostgreSQLRepo";

  private toDTO = (entry: todo_entry): TodoEntryDTO => {
    return {
      id: entry.id,
      text: entry.text,
      description: entry.description ?? undefined,
      status: entry.todo_status as TodoStatus,
      creationDate: entry.creation_date.toISOString(),
      type: entry.todo_type as TodoType,
      lastChecked: entry.last_checked ? entry.last_checked.toISOString() : undefined,
      periodSeconds: entry.period_seconds ?? undefined,
    };
  }

  private fromDTO = (dto: TodoEntryDTO): todo_entry => {
    return {
      id: dto.id,
      text: dto.text,
      description: dto.description ?? null,
      todo_status: dto.status as item_status,
      creation_date: new Date(dto.creationDate),
      todo_type: dto.type as item_type,
      last_checked: dto.lastChecked ? new Date(dto.lastChecked) : null,
      period_seconds: dto.periodSeconds ?? null,
    };
  }

  public getAll = (): Promise<TodoEntryDTO[]> => {
    prisma.todo_entry.fields
    return prisma.todo_entry.findMany({
      where: { 
        todo_status: { 
          not: item_status.DELETED 
        }
      }
    }).then(sqlEntries => sqlEntries.map(sqlEntry => this.toDTO(sqlEntry)))
      .catch(err => err);
  }

  public get = (id: string): any | Promise<TodoEntryDTO | null> => {
    return prisma.todo_entry.findFirst({where: { id: id }})
      .then(entry => entry ? this.toDTO(entry) : null)
      .catch(err => err);
  }

  public add = (dto: TodoEntryDTO): any | Promise<TodoEntryDTO> => {
    return prisma.todo_entry.create({ 
      data: this.fromDTO(dto)
    }).then(sqlEntry => this.toDTO(sqlEntry))
      .catch(err => err);
  }

  public update = (id: string, dto: TodoEntryDTO): any | Promise<TodoEntryDTO> => {
    return prisma.todo_entry.update({
      where: { id: id },
      data: this.fromDTO(dto)
    }).then(sqlEntry => this.toDTO(sqlEntry))
      .catch(err => err);
  }
}

export const PostgreRepository = new postgreRepository();
