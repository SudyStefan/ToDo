import { Request, Response } from "express";
import { MongoRepo } from "../repositories/mongoRepository.js";
import { Repository } from "../repositories/Repository.js";
import { PostgreRepository } from "../repositories/postgreRepository.js";

class todoController {
  private repo: Repository;
  
  constructor(repository: Repository) {
    console.log(`Starting API with ${repository.name} ...`);
    this.repo = repository;
  }

  
  public getAllEntries = (req: Request, res: Response) => {
    this.repo.getAll()
      .then(entries => res.json(entries))
      .catch(err => {
        console.error("Error fetching entries:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      });
  };

  public getEntry = (req: Request, res: Response) => {
    this.repo.get(req.params.id)
      .then(entry => res.json(entry ? entry : res.status(404).json({ error: "Not Found" })))
      .catch(err => res.status(500).json({ error: "Internal Server Error" }));
  };

  public addEntry = (req: Request, res: Response) => {
    this.repo.add(req.body)
      .then(entry => res.json(entry))
      .catch(err => {
        console.error("Error adding entry: ", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  };

  public updateEntry = (req: Request, res: Response) => {
    this.repo.update(req.params.id, req.body)
      .then(entry => res.json(entry))
      .catch(err => {
        console.error("Error updating entry:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  };
}

//export const TodoController = new todoController(MongoRepo);
export const TodoController = new todoController(PostgreRepository);