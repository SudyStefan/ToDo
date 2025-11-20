import mongoose from "mongoose";
import { ToDoType, ToDoStatus } from "./shared/types/ToDoEntry.js";
await mongoose.connect("mongodb+srv://BergMichel:JQtPHPxyNV6RzHD@tododata.zndg1ff.mongodb.net/?appName=TodoData");
const ToDoSchema = new mongoose.Schema({
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
}, {
    timestamps: false,
});
const fromEntity = (entity) => ({
    _id: entity._id,
    text: entity.text,
    status: entity.status,
    creationDate: entity.creationDate,
    type: entity.type,
    lastChecked: entity.lastChecked,
    period: entity.period,
    deleted: entity.deleted,
});
const toEntity = (entry) => ({
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
    getAll() {
        console.log("Fetching all entries from database");
        return ToDoModel.find().then(entities => entities.map(fromEntity));
    }
    ;
    get(id) {
        console.log(`Fetching entry with id ${id} from database`);
        return ToDoModel.findById(id).then(entity => entity ? fromEntity(entity) : null);
    }
    add(newEntry) {
        return new ToDoModel(toEntity(newEntry))
            .save()
            .then(saved => fromEntity(saved))
            .catch(err => {
            console.error("Error adding new entry:", err);
            throw err;
        });
    }
}
export const toDoRepo = new ToDoRepo();
