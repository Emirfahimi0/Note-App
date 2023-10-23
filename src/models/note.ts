import { Schema, model } from "mongoose";

const noteSchema = new Schema({
  title: {
    required: true,
    trim: true,
    type: String,
  },

  description: {
    trim: true,
    type: String,
  },
});

export const noteModel = model<INote>("Note", noteSchema);
