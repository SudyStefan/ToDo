"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEntry = exports.updateEntry = exports.addEntry = exports.getEntries = void 0;
const repo_1 = require("../repo");
const getEntries = (req, res) => {
    const entries = repo_1.toDoRepo.get();
    res.json(entries);
};
exports.getEntries = getEntries;
const addEntry = (req, res) => {
    const newEntry = req.body;
    repo_1.toDoRepo.add(newEntry);
    res.status(201).json(newEntry);
};
exports.addEntry = addEntry;
const updateEntry = (req, res) => {
    const id = Number(req.params.id);
    const updatedEntry = req.body;
    repo_1.toDoRepo.update(updatedEntry);
    res.json(updatedEntry);
};
exports.updateEntry = updateEntry;
const deleteEntry = (req, res) => {
    const id = Number(req.params.id);
    repo_1.toDoRepo.remove(id);
    res.sendStatus(204);
};
exports.deleteEntry = deleteEntry;
