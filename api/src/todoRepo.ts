import mongoose from "mongoose";
import { ToDoEntryDTO, ToDoType, ToDoStatus } from "./models/todoDTO.js";
import { ToDoSchema } from "./models/todoSchema.js";
import { dbAccount } from "./dbAccount.js";

await mongoose.connect(`mongodb+srv://${dbAccount.user}:${dbAccount.password}@tododata.zndg1ff.mongodb.net/?appName=TodoData`);
const ToDoModel = mongoose.model("ToDoEntry", ToDoSchema);

const fromEntityToDTO = (entity: any): ToDoEntryDTO | undefined => {
  try {
    return {
      _id: entity._id,
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
  
const toEntityFromDTO = (entry: ToDoEntryDTO): any => {
  try {
    return {
      _id: new mongoose.Types.ObjectId(entry._id),
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

class toDoRepo {
  public getAll = (): Promise<ToDoEntryDTO[]> => {
    return ToDoModel.find()
      .then(entities => entities.map(fromEntityToDTO).filter(Boolean) as ToDoEntryDTO[])
      .catch(err => err);
  };

  public get = (id: number): Promise<ToDoEntryDTO | null> => {
    return ToDoModel.findById(id)
      .then(entity => fromEntityToDTO(entity))
      .catch(err => err);
  };

  public add = (entry: ToDoEntryDTO): Promise<ToDoEntryDTO> => {
    return new ToDoModel(toEntityFromDTO(entry)).save()
      .then(saved => fromEntityToDTO(saved))
      .catch(err => err);
  };

  public update = (id: string, entry: ToDoEntryDTO): Promise<ToDoEntryDTO> => {
    return new ToDoModel(toEntityFromDTO(entry)).replaceOne({ _id: id})
      .then(saved => fromEntityToDTO(saved))
      .catch(err => err);
  };
}

//Singleton
export const ToDoRepo = new toDoRepo();