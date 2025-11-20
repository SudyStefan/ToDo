import mongoose from "mongoose";
import { ToDoEntryDTO, ToDoType, ToDoStatus } from "./models/ToDoDTO.js";
import { ToDoSchema } from "./models/ToDoSchema.js";

await mongoose.connect("mongodb+srv://BergMichel:JQtPHPxyNV6RzHD@tododata.zndg1ff.mongodb.net/?appName=TodoData");
const ToDoModel = mongoose.model("ToDoEntry", ToDoSchema);

const fromEntityToDTO = (entity: any): ToDoEntryDTO => ({
  _id: entity._id.toString(),
  text: entity.text,
  status: entity.status,
  creationDate: entity.creationDate.toISOString(),
  type: entity.type,
  lastChecked: entity.lastChecked ? entity.lastChecked.toISOString() : null,
  period: entity.period,
  deleted: entity.deleted,
})

const toEntityFromDTO = (entry: ToDoEntryDTO): any => ({
  _id: new mongoose.Types.ObjectId(entry._id),
  text: entry.text,
  status: entry.status,
  creationDate: entry.creationDate,
  type: entry.type,
  lastChecked: entry.lastChecked ? entry.lastChecked : null,
  period: entry.period,
  deleted: entry.deleted,
});

class ToDoRepo {
  getAll(): Promise<ToDoEntryDTO[]> {
    console.log("Fetching all entries from database");
    return ToDoModel.find().then(entities => entities.map(fromEntityToDTO));
  };

  get(id: number): Promise<ToDoEntryDTO | null> {
    console.log(`Fetching entry with id ${id} from database`);
    return ToDoModel.findById(id).then(entity => entity ? fromEntityToDTO(entity) : null);
  }

  add(newEntry: ToDoEntryDTO): Promise<ToDoEntryDTO> {
    return new ToDoModel(toEntityFromDTO(newEntry))
      .save()
      .then(saved => fromEntityToDTO(saved))
      .catch(err => {
        console.error("Error adding new entry:", err);
        throw err;
      });
    }
}

export const toDoRepo = new ToDoRepo();