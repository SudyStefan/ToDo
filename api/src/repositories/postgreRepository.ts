import { item_status, PrismaClient } from "@prisma/client";
import { TodoEntryDTO, TodoStatus } from "../models/todoDTO.js";
import { Repository } from "./Repository.js";

const prisma = new PrismaClient();

class postgreRepository implements Repository {

  private toDTO = (entry: any): TodoEntryDTO => {
    return {
      id: entry.id,
      text: entry.text,
      status: entry.status != TodoStatus.DELETED ? entry.status : null,
      creationDate: entry.creationDate.toISOString(),
      type: entry.type,
      lastChecked: entry.lastChecked ? entry.lastChecked.toISOString() : null,
      period: entry.period,
    };
  }

  private fromDTO = (dto: TodoEntryDTO): any => {
    return {
      id: dto.id,
      text: dto.text,
      status: dto.status,
      creationDate: new Date(dto.creationDate),
      type: dto.type,
      lastChecked: dto.lastChecked ? new Date(dto.lastChecked) : null,
      period: dto.period,
    };
  }

  public getAll = (): Promise<TodoEntryDTO[]> => {
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
      .then(sqlEntry => this.toDTO(sqlEntry))
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