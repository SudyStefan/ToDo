import { Router } from "express";
import { getAllEntries, getEntry, addEntry, updateEntry, deleteEntry } from "../controllers/controller.js";

export const todosRouter = Router();

todosRouter.get("/", getAllEntries);

todosRouter.get("/:id", getEntry);

todosRouter.post("/", addEntry);

todosRouter.put("/:id", updateEntry);

todosRouter.delete("/:id", deleteEntry);
