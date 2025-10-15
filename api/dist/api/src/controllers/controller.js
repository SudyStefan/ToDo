let entries = [
    { id: 1, text: "Sample ToDo", done: false },
    { id: 2, text: "Another ToDo", done: true }
];
export const getList = (req, res) => {
    res.json(entries);
};
export const createItem = (req, res) => {
    const newItem = { id: entries.length + 1, text: req.body.name, done: false };
    entries.push(newItem);
    res.status(201).json(newItem);
};
