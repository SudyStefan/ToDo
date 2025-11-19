"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeInSeconds = exports.ToDoType = exports.ToDoStatus = void 0;
var ToDoStatus;
(function (ToDoStatus) {
    ToDoStatus[ToDoStatus["Open"] = 0] = "Open";
    ToDoStatus[ToDoStatus["Done"] = 1] = "Done";
    ToDoStatus[ToDoStatus["Deleted"] = 2] = "Deleted";
})(ToDoStatus || (exports.ToDoStatus = ToDoStatus = {}));
;
var ToDoType;
(function (ToDoType) {
    ToDoType[ToDoType["Single"] = 0] = "Single";
    ToDoType[ToDoType["Periodic"] = 1] = "Periodic";
})(ToDoType || (exports.ToDoType = ToDoType = {}));
;
var TimeInSeconds;
(function (TimeInSeconds) {
    TimeInSeconds[TimeInSeconds["Day"] = 86400] = "Day";
    TimeInSeconds[TimeInSeconds["Week"] = 604800] = "Week";
})(TimeInSeconds || (exports.TimeInSeconds = TimeInSeconds = {}));
;
