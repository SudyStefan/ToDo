import { Router } from "express";
import { ToDoController } from "../controllers/todoController.js";

export const todosRouter = Router();

todosRouter.get("/", ToDoController.getAllEntries);

todosRouter.get("/:id", ToDoController.getEntry);

todosRouter.post("/", ToDoController.addEntry);

todosRouter.put("/:id", ToDoController.updateEntry);
