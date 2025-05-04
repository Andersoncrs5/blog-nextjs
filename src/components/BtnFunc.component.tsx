import { clsx } from "clsx";

interface Values {
  name: string;
  color: string;
  onClick: () => void;
  colorHover?: string;
  padding?: string;
  more?: string;
}

export default function BtnFunc(props: Values) {
  const bg: string = `bg-${props.color}`;
  const hover: string = `hover:bg-${props.colorHover || 'white'}`;
  const padding: string = `p-${props.padding || 1}`;

  return (
    <button
      onClick={props.onClick}
      className={clsx(
        bg,
        hover,
        "border rounded pe-3 ps-3",
        padding,
        props.more
      )}
    >
      {props.name}
    </button>
  );
}
