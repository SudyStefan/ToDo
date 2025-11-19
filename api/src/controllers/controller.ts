import { Request, Response } from "express";
import { ToDoEntry } from "../../../shared/types/ToDoEntry.js";
import { DummyData } from "../../../shared/dummyData/dummyData.js";
import { toDoRepo } from "../repo.js";

export const getEntries = (req: Request, res: Response) => {
  const entries = toDoRepo.get();
  res.json(entries);
}

export const addEntry = (req: Request, res: Response) => {
  const newEntry: ToDoEntry = req.body;
  toDoRepo.add(newEntry);
  res.status(201).json(newEntry);
}

export const updateEntry = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updatedEntry: ToDoEntry = req.body;
  toDoRepo.update(updatedEntry);
  res.json(updatedEntry);
}

export const deleteEntry = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  toDoRepo.remove(id);
  res.sendStatus(204);
}