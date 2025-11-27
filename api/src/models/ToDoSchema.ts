import mongoose from "mongoose";
import { TodoStatus, TodoType } from "./todoDTO.js";

export const TodoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    status: { 
      type: Number, 
      enum: Object.values(TodoStatus).filter(v => typeof v === 'number'),
      required: true 
    },
    creationDate: { type: Date, required: true },
    type: { 
      type: Number, 
      enum: Object.values(TodoType).filter(v => typeof v === 'number'),
      required: true 
    },
    lastChecked: { type: Date },
    period: { type: Number },
  },
  {
    timestamps: false,
  }
);

