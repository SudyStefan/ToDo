import { Request, Response } from "express";
import { ToDoEntry } from "../../../shared/types/ToDoEntry.js";


let entries: ToDoEntry[] = [
  { id: 1, text: "Sample ToDo", done: false },
  { id: 2, text: "Another ToDo", done: true }
];

export const getList = (req: Request, res: Response) => {
  res.json(entries);
};

export const createItem = (req: Request, res: Response) => {
  const newItem: ToDoEntry = { id: entries.length + 1, text: req.body.name, done: false };
  entries.push(newItem);
  res.status(201).json(newItem);
};
