import { Request, Response } from "express";
import { fromDTO, ToDoEntry, toDTO } from "../shared/types/ToDoEntry.js";
import { toDoRepo } from "../todoRepo.js";

export const getEntries = (req: Request, res: Response) => {
  toDoRepo.getAll()
    .then(entries => res.json(entries.map(toDTO)))
    .catch(err => {
      console.error("Error fetching entries:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

export const addEntry = (req: Request, res: Response) => {
  toDoRepo.add(fromDTO(req.body))
    .then(entry => res.json(toDTO(entry)))
    .catch(err => {
      console.error("Error adding entry:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

export const updateEntry = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updatedEntry: ToDoEntry = req.body;
  //toDoRepo.update(updatedEntry);
  res.json(updatedEntry);
}

export const deleteEntry = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  //toDoRepo.remove(id);
  res.sendStatus(204);
}