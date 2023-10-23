import { useState, ChangeEventHandler, useEffect } from "react";
import axios from "axios";
import { NoteItem } from "./components/NoteItems";

const App = () => {
  const [noteToView, setNoteToView] = useState<INotesData | undefined>(
    undefined
  );
  const [notes, setNotes] = useState<INotesData[] | undefined>(undefined);
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const [selectedNoteId, setSelectedNoteId] = useState("");

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  const fetchNotes = async () => {
    // call the api and fetch notes
    const { data } = await axios("http://localhost:3000/note/find");
    setNotes(data.notes);
  };

  useEffect(() => {
    if (notes === undefined) {
      fetchNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewNote = (note: INotesData) => {
    if (noteToView !== undefined) {
      setNoteToView(undefined);
    } else {
      setNoteToView(note);
    }
  };

  const handleDeleteNote = async (note: INotesData) => {
    const result = confirm("Are you sure?");
    if (result) {
      // delete
      await axios
        .delete(`http://localhost:3000/note/delete/${note.id}`)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });

      const updatedNotes =
        notes !== undefined ? notes.filter(({ id }) => id !== note.id) : [];

      setNotes([...updatedNotes]);
    }
  };

  const handleEditNote = (note: INotesData) => {
    setSelectedNoteId(note.id);
    setValues({
      title: note.title,
      description: note.description || "",
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <form
        onSubmit={async (evt) => {
          evt.preventDefault();
          if (selectedNoteId) {
            const { data } = await axios.patch(
              `http://localhost:3000/note/update/${selectedNoteId}`,
              {
                title: values.title || "",
                description: values.description,
              }
            );

            const updatedNotes = notes!.map((note) => {
              if (note.id === selectedNoteId) {
                note.title = data.note.title;
                note.description = data.note.description;
              }
              return note;
            });

            setNotes([...updatedNotes]);
            setValues({ title: "", description: "" });
            return;
          }

          const { data } = await axios.post(
            "http://localhost:3000/note/create",
            {
              title: values.title,
              description: values.description,
            }
          );
          setNotes([data.note, ...notes!]);
          setValues({ title: "", description: "" });
        }}
        className="space-y-6 bg-white shadow-md rounded p-5"
      >
        <h1 className="font-semibold text-2xl text-center">Note Application</h1>
        <div>
          <input
            placeholder="Title"
            type="text"
            className="w-full border-b-2 border-gray-700 outline-none"
            onChange={handleChange}
            value={values.title}
            name="title"
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            className="w-full border-b-2 border-gray-700 outline-none resize-none h-36"
            value={values.description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
        <div className="text-right">
          <button className="bg-blue-500 text-white px-5 py-2 rounded">
            Submit
          </button>
        </div>
      </form>

      {/* Note Items */}

      {notes !== undefined
        ? notes.map((note) => {
            return (
              <NoteItem
                handleView={() => handleViewNote(note)}
                description={
                  noteToView?.id === note.id ? noteToView?.description : ""
                }
                handleEdit={() => handleEditNote(note)}
                handleDelete={() => handleDeleteNote(note)}
                key={note.id}
                title={note.title}
              />
            );
          })
        : null}
    </div>
  );
};

export default App;
