import mongoose from "mongoose";
import { TodoEntryDTO, TodoType, TodoStatus } from "../models/todoDTO.js";
import { TodoSchema } from "../models/todoSchema.js";
import { dbAccount } from "../dbAccount.js";
import { Repository } from "./Repository.js";

await mongoose.connect(`mongodb+srv://${dbAccount.user}:${dbAccount.password}@tododata.zndg1ff.mongodb.net/?appName=TodoData`);
const ToDoModel = mongoose.model("ToDoEntry", TodoSchema);

class mongoRepo implements Repository {
  private toDTO = (entity: any): TodoEntryDTO | undefined => {
    try {
      return {
        id: entity._id,
        text: entity.text,
        status: entity.status,
        creationDate: entity.creationDate.toISOString(),
        type: entity.type,
        lastChecked: entity.lastChecked ? entity.lastChecked.toISOString() : null,
        period: entity.period,
      };
    } catch (error) {
      console.log("Faulty entity:", entity);
    };
  }

  private fromDTO = (entry: TodoEntryDTO): any => {
    try {
      return {
        _id: new mongoose.Types.ObjectId(entry.id),
        text: entry.text,
        status: entry.status,
        creationDate: entry.creationDate,
        type: entry.type,
        lastChecked: entry.lastChecked ? entry.lastChecked : null,
        period: entry.period,
      } 
    } catch (error) {
      console.log("Faulty DTO:", entry);
    }
  };

  public getAll = (): Promise<TodoEntryDTO[]> => {
    return ToDoModel.find()
      .then(entities => entities.map(entity => this.toDTO(entity)).filter(Boolean) as TodoEntryDTO[])
      .catch(err => err);
  };

  public get = (id: string): Promise<TodoEntryDTO | null> => {
    return ToDoModel.findById(id)
      .then(entity => this.toDTO(entity))
      .catch(err => err);
  };

  public add = (dto: TodoEntryDTO): Promise<TodoEntryDTO> => {
    return new ToDoModel(this.fromDTO(dto)).save()
      .then(saved => this.toDTO(saved))
      .catch(err => err);
  };

  public update = (id: string, entry: TodoEntryDTO): Promise<TodoEntryDTO> => {
    return new ToDoModel(this.toDTO(entry)).replaceOne({ _id: id})
      .then(saved => this.toDTO(saved))
      .catch(err => err);
  };
}

export const MongoRepo = new mongoRepo();