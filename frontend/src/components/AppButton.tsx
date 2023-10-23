import { FunctionComponent } from "react";

interface IAppButtonProps {
  title?: string;
  type?: "danger" | "normal" | "regular";
  onClick?(): void;
}

export const AppButton: FunctionComponent<IAppButtonProps> = ({
  title,
  type,
  onClick,
}: IAppButtonProps) => {
  let color = "";

  switch (type) {
    case "danger":
      color = "bg-red-500";
      break;
    case "normal":
      color = "bg-gray-500";
      break;
    case "regular":
      color = "bg-blue-500";
      break;
  }

  return (
    <button onClick={onClick} className={color + " text-white p-2 rounded"}>
      {title}
    </button>
  );
};
