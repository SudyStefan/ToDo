export var ToDoStatus;
(function (ToDoStatus) {
    ToDoStatus[ToDoStatus["Open"] = 0] = "Open";
    ToDoStatus[ToDoStatus["Done"] = 1] = "Done";
    ToDoStatus[ToDoStatus["Deleted"] = 2] = "Deleted";
})(ToDoStatus || (ToDoStatus = {}));
;
export var ToDoType;
(function (ToDoType) {
    ToDoType[ToDoType["Single"] = 0] = "Single";
    ToDoType[ToDoType["Periodic"] = 1] = "Periodic";
})(ToDoType || (ToDoType = {}));
;
export var TimeInSeconds;
(function (TimeInSeconds) {
    TimeInSeconds[TimeInSeconds["Day"] = 86400] = "Day";
    TimeInSeconds[TimeInSeconds["Week"] = 604800] = "Week";
})(TimeInSeconds || (TimeInSeconds = {}));
;
export const fromDTO = (dto) => {
    return {
        ...dto,
        creationDate: new Date(dto.creationDate),
        lastChecked: dto.lastChecked ? new Date(dto.lastChecked) : undefined,
    };
};
export const toDTO = (entry) => {
    return {
        ...entry,
        creationDate: entry.creationDate.toISOString(),
        lastChecked: entry.lastChecked ? entry.lastChecked.toISOString() : undefined,
    };
};
