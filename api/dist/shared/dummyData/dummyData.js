"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyData = void 0;
const ToDoEntry_1 = require("../types/ToDoEntry");
exports.DummyData = [
    { id: 1, text: 'Learn TypeScript', status: ToDoEntry_1.ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoEntry_1.ToDoType.Single },
    { id: 2, text: 'Build a ToDo App', status: ToDoEntry_1.ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoEntry_1.ToDoType.Single },
    { id: 3, text: 'Test the App', status: ToDoEntry_1.ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoEntry_1.ToDoType.Single },
    { id: 4, text: 'Learn CSS', status: ToDoEntry_1.ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoEntry_1.ToDoType.Single },
    { id: 5, text: 'Read a book', status: ToDoEntry_1.ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoEntry_1.ToDoType.Single },
    { id: 6, text: 'Go for a walk', status: ToDoEntry_1.ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoEntry_1.ToDoType.Single },
    { id: 7, text: 'Write some code', status: ToDoEntry_1.ToDoStatus.Open, creationDate: new Date("2025-10-01"), type: ToDoEntry_1.ToDoType.Single },
    { id: 8, text: 'Watch a movie', status: ToDoEntry_1.ToDoStatus.Deleted, creationDate: new Date("2025-10-01"), type: ToDoEntry_1.ToDoType.Single },
    { id: 9, text: 'Cook dinner', status: ToDoEntry_1.ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoEntry_1.ToDoType.Single },
    { id: 10, text: 'asdadsasdadsasdasdasdadasdasd', status: ToDoEntry_1.ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoEntry_1.ToDoType.Single },
    { id: 11, text: 'Küche', status: ToDoEntry_1.ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoEntry_1.ToDoType.Periodic, lastChecked: new Date("2025-10-20"), period: ToDoEntry_1.TimeInSeconds.Week * 2 },
    { id: 12, text: 'Dusche', status: ToDoEntry_1.ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoEntry_1.ToDoType.Periodic, lastChecked: new Date("2025-10-20"), period: ToDoEntry_1.TimeInSeconds.Week * 3 },
    { id: 13, text: 'Klo', status: ToDoEntry_1.ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoEntry_1.ToDoType.Periodic, lastChecked: new Date("2025-10-20"), period: ToDoEntry_1.TimeInSeconds.Week },
    { id: 14, text: 'Gang', status: ToDoEntry_1.ToDoStatus.Done, creationDate: new Date("2025-10-01"), type: ToDoEntry_1.ToDoType.Periodic, lastChecked: new Date("2025-10-20"), period: ToDoEntry_1.TimeInSeconds.Week * 4 },
];
