import { FunctionComponent } from "react";
import { AppButton } from ".";

interface INoteItemProps {
  description?: string;
  handleDelete?(): void;
  handleEdit?(): void;
  handleView?(): void;
  title?: string;
}

export const NoteItem: FunctionComponent<INoteItemProps> = ({
  description,
  handleDelete,
  handleEdit,
  handleView,
  title,
}: INoteItemProps) => {
  return (
    <div className="bg-white shadow-md rounded p-5">
      <p className="font-semibold mb-4 text-gray-700 text-lg">{title}</p>
      {description ? <p className="ml-2 py-2 text-lg">{description}</p> : null}
      <div className="space-x-4">
        <AppButton
          title={description ? "Hide" : "View"}
          type="regular"
          onClick={handleView}
        />
        <AppButton onClick={handleEdit} title="Edit" type="normal" />
        <AppButton title="Delete" type="danger" onClick={handleDelete} />
      </div>
    </div>
  );
};
