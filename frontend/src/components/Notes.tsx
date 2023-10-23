import { ChangeEventHandler, FormEvent, FunctionComponent } from "react";

import axios, { AxiosResponse } from "axios";
interface INotes {
  descriptionPlaceHolder?: string;
  note: INotesData;
  setNote: (data: INotesData) => void;
  title: string;
  titlePlaceHolder?: string;
}

export const Notes: FunctionComponent<INotes> = ({
  title,
  titlePlaceHolder,
  setNote,
  note,
  descriptionPlaceHolder,
}: INotes) => {
  const onChangeInput: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;
    setNote({ ...note, [name]: value });
  };

  const onSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (note.id !== "") {
      // then we want to update
      const { data } = await axios.patch(
        `http://localhost:8000/note/${note.id}`,
        {
          title: note.title,
          description: note.description,
        }
      );

      console.log("data", data.note);
      return;
    }
    await axios
      .post("http://localhost:3000/note/create", {
        title: note.title,
        description: note.description,
      })
      .then((response: AxiosResponse) => {
        console.log(response.data);
      });
  };

  return (
    <form
      className="max-w-3xl mx-auto bg-[#1C3144] shadow-lg rounded p-12  space-y-8 mt-20"
      onSubmit={onSubmitForm}
    >
      <h1 className="font-semibold text-2xl text-[#FBF7F4] text-center ">
        {title}
      </h1>
      <div>
        <input
          placeholder={titlePlaceHolder !== undefined ? titlePlaceHolder : ""}
          type="text"
          value={note.title}
          name="title"
          onChange={onChangeInput}
          className="w-full border-2 rounded-md  outline-none"
        />
      </div>
      <div>
        <textarea
          placeholder={
            descriptionPlaceHolder !== undefined ? descriptionPlaceHolder : ""
          }
          value={note.description}
          onChange={onChangeInput}
          name="description"
          className="w-full border-2 outline-none rounded-md resize-none h-36"
        ></textarea>
      </div>
      <div className="text-right">
        <button
          className="bg-[#6C9A8B] text-white px-5 py-2 rounded"
          onClick={() => {
            console.log(note);
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Notes;
