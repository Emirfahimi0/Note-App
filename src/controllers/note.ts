import { RequestHandler } from "express";
import { noteModel } from "../models";
import { isEmpty } from "../utils";

export const createNotes: RequestHandler = async (req, res) => {
  const incomingBody: INote = req.body;
  const newNote = {
    description: incomingBody.description,
    title: incomingBody.title,
  };
  const newNotes = await noteModel.create<INote>(newNote);
  res.json({
    createdNewNotes: {
      id: newNotes.id,
      title: newNotes.title,
      description: newNotes.description,
    },
  });
};

export const updateNotesById: RequestHandler = async (req, res) => {
  const { _id } = req.params;

  const { title, description }: INote = req.body;
  const selectedNote = await noteModel.findByIdAndUpdate(_id, {
    title,
    description,
  });
  if (selectedNote === undefined || selectedNote === null)
    return res.json({ error: "Note not found!" });

  await selectedNote.save();

  res.json({
    selectedNote: {
      id: selectedNote._id,
      title: selectedNote.title,
      description: selectedNote.description,
    },
  });
};

export const getAllNotes: RequestHandler = async (req, res) => {
  const allNotes = await noteModel.find();
  res.json({
    notes: allNotes.map((notes) => {
      return {
        id: notes._id,
        title: notes.title,
        description: notes.description,
      };
    }),
  });
};

export const findNotesById: RequestHandler = async (req, res) => {
  const { _id } = req.params;
  const selectedNote = await noteModel.findById(_id);
  if (isEmpty(selectedNote) === true)
    return res.json({ error: "notes not found!" });

  res.json({ selectedNote });
};

export const deleteNotesById: RequestHandler = async (req, res) => {
  const { _id } = req.params;
  const deleteNote = await noteModel.findByIdAndDelete(_id);
  if (isEmpty(deleteNote) === true) {
    return res.json({ error: "Note cannot be remove!" });
  }

  deleteNote!.save();
  res.json({ message: "noted deleted successfully" });
};
