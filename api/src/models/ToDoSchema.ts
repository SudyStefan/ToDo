import mongoose from "mongoose";
import { ToDoStatus, ToDoType } from "./todoDTO.js";

export const ToDoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    status: { 
      type: Number, 
      enum: Object.values(ToDoStatus).filter(v => typeof v === 'number'),
      required: true 
    },
    creationDate: { type: Date, required: true },
    type: { 
      type: Number, 
      enum: Object.values(ToDoType).filter(v => typeof v === 'number'),
      required: true 
    },
    lastChecked: { type: Date },
    period: { type: Number },
  },
  {
    timestamps: false,
  }
);

