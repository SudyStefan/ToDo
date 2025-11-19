import { Router } from "express";
import { getEntries, addEntry, updateEntry, deleteEntry } from "../controllers/controller";

export const todosRouter = Router();

todosRouter.get("/", getEntries);

todosRouter.post("/", addEntry);

todosRouter.put("/:id", updateEntry);

todosRouter.delete("/:id", deleteEntry);
