import { Router } from "express";
import { ToDoEntry } from "../../../shared/types/ToDoEntry.js";

const todos: ToDoEntry[] = [];
export const todosRouter = Router();

todosRouter.get("/", (req, res) => res.json(todos));

todosRouter.post("/", (req, res) => {
  const { text } = req.body;
  const todo: ToDoEntry = { id: Date.now(), text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

todosRouter.put("/:id", (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.sendStatus(404);
  todo.done = req.body.done;
  res.json(todo);
});

todosRouter.delete("/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.sendStatus(404);
  todos.splice(index, 1);
  res.sendStatus(204);
});
