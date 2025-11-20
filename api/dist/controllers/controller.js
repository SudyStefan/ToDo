import { toDoRepo } from "../todoRepo.js";
export const getAllEntries = (req, res) => {
    toDoRepo.getAll()
        .then(entries => res.json(entries))
        .catch(err => {
        console.error("Error fetching entries:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    });
};
export const getEntry = (req, res) => {
    const id = Number(req.params.id);
    toDoRepo.get(id)
        .then(entry => res.json(entry ? entry : res.status(404).json({ error: "Not Found" })))
        .catch(err => res.status(500).json({ error: "Internal Server Error" }));
};
export const addEntry = (req, res) => {
    toDoRepo.add(req.body)
        .then(entry => res.json(entry))
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
