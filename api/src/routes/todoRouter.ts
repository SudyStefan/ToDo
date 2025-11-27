import { Router } from "express";
import { TodoController } from "../controllers/todoController.js";

export const TodoRouter = Router();

TodoRouter.get("/", TodoController.getAllEntries);

TodoRouter.get("/:id", TodoController.getEntry);

TodoRouter.post("/", TodoController.addEntry);

TodoRouter.put("/:id", TodoController.updateEntry);
