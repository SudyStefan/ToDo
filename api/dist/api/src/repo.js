"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDoRepo = void 0;
const dummyData_js_1 = require("../../shared/dummyData/dummyData.js");
class ToDoRepo {
    entries = dummyData_js_1.DummyData;
    get() {
        return this.entries;
    }
    add(newEntry) {
        this.entries.push(newEntry);
    }
    remove(id) {
        this.entries = this.entries.filter(entry => entry.id !== id);
    }
    update(updatedEntry) {
        this.entries = this.entries.map(entry => {
            if (entry.id === updatedEntry.id) {
                return updatedEntry;
            }
            else {
                return entry;
            }
        });
    }
}
exports.toDoRepo = new ToDoRepo();
