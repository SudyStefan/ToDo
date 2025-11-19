import express, { Request, Response } from "express";
import cors from "cors";
import { todosRouter } from "./routes/router";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.use("/todo", todosRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});