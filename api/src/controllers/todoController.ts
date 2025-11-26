import { Request, Response } from "express";
import { ToDoRepo } from "../todoRepo.js";

class toDoController {
  public getAllEntries = (req: Request, res: Response) => {
    ToDoRepo.getAll()
      .then(entries => res.json(entries))
      .catch(err => {
        console.error("Error fetching entries:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      });
  };

  public getEntry = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    ToDoRepo.get(id)
      .then(entry => res.json(entry ? entry : res.status(404).json({ error: "Not Found" })))
      .catch(err => res.status(500).json({ error: "Internal Server Error" }));
  };

  public addEntry = (req: Request, res: Response) => {
    ToDoRepo.add(req.body)
      .then(entry => res.json(entry))
      .catch(err => {
        console.error("Error adding entry:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  };

  public updateEntry = (req: Request, res: Response) => {
    ToDoRepo.update(req.params.id, req.body)
      .then(entry => res.json(entry))
      .catch(err => {
        console.error("Error updating entry:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  };
}

//Singleton
export const ToDoController = new toDoController();