import { Router } from "express";
import {
  createNotes,
  deleteNotesById,
  findNotesById,
  getAllNotes,
  updateNotesById,
} from "../controllers";

const route = Router();

// create note
route.post("/create", createNotes);

// Update note
route.patch("/update/:_id", updateNotesById);

// Find all notes/ read
route.get("/find", getAllNotes);

// find notes by id
route.get("/find/:_id", findNotesById);

// Delete Note
route.delete("/delete/:_id", deleteNotesById);

export const noteRoute = route;
