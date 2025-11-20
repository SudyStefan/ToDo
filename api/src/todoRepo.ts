import mongoose from "mongoose";
import { ToDoEntry, ToDoType, ToDoStatus } from "./shared/types/ToDoEntry.js";

await mongoose.connect("mongodb+srv://BergMichel:JQtPHPxyNV6RzHD@tododata.zndg1ff.mongodb.net/?appName=TodoData");

const ToDoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    status: { 
      type: Number, 
      enum: Object.values(ToDoStatus).filter(v => typeof v === 'number'),
      required: true 
    },
    creationDate: { type: Date, required: true },
    type: { 
      type: Number, 
      enum: Object.values(ToDoType).filter(v => typeof v === 'number'),
      required: true 
    },
    lastChecked: { type: Date },
    period: { type: Number },
    deleted: { type: Boolean, required: true }
  },
  {
    timestamps: false,
  }
);

const fromEntityToDTO = (entity: any): ToDoEntry => ({
  _id: entity._id.toString(),
  text: entity.text,
  status: entity.status,
  creationDate: entity.creationDate.toISOString(),
  type: entity.type,
  lastChecked: entity.lastChecked.toISOString(),
  period: entity.period,
  deleted: entity.deleted,
})

const toEntityFromDTO = (entry: ToDoEntry): any => ({
  _id: new mongoose.Types.ObjectId(entry._id),
  text: entry.text,
  status: entry.status,
  creationDate: entry.creationDate,
  type: entry.type,
  lastChecked: entry.lastChecked,
  period: entry.period,
  deleted: entry.deleted,
});

const ToDoModel = mongoose.model("ToDoEntry", ToDoSchema);

class ToDoRepo {
  getAll(): Promise<ToDoEntry[]> {
    console.log("Fetching all entries from database");
    return ToDoModel.find().then(entities => entities.map(fromEntityToDTO));
  };

  get(id: number): Promise<ToDoEntry | null> {
    console.log(`Fetching entry with id ${id} from database`);
    return ToDoModel.findById(id).then(entity => entity ? fromEntityToDTO(entity) : null);
  }

  add(newEntry: ToDoEntry): Promise<ToDoEntry> {
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