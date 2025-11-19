import { fromDTO, toDTO } from "../shared/types/ToDoEntry.js";
import { toDoRepo } from "../todoRepo.js";
export const getEntries = (req, res) => {
    toDoRepo.getAll()
        .then(entries => res.json(entries.map(toDTO)))
        .catch(err => {
        console.error("Error fetching entries:", err);
        res.status(500).json({ error: "Internal Server Error" });
    });
};
export const addEntry = (req, res) => {
    toDoRepo.add(fromDTO(req.body))
        .then(entry => res.json(toDTO(entry)))
        .catch(err => {
        console.error("Error adding entry:", err);
        res.status(500).json({ error: "Internal Server Error" });
    });
};
export const updateEntry = (req, res) => {
    const id = Number(req.params.id);
    const updatedEntry = req.body;
    //toDoRepo.update(updatedEntry);
    res.json(updatedEntry);
};
export const deleteEntry = (req, res) => {
    const id = Number(req.params.id);
    //toDoRepo.remove(id);
    res.sendStatus(204);
};
