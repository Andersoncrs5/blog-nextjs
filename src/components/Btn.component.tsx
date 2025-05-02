import Link from "next/link";
import { clsx } from "clsx";

interface Values {
  url: string;
  color: string;
  name: string;
  colorHover?: string;
  padding?: string;
  more?: string;
}

export default function Btn(props: Values) {
  const bg = `bg-${props.color}`;
  const hover = `hover:bg-${props.colorHover || 'white'}`;
  const padding = `p-${props.padding || 1}`;

  return (
    <Link
      href={`/${props.url}`}
      className={clsx(bg, hover, "border rounded pe-3 ps-3", padding, props.more)}
    >
      {props.name}
    </Link>
  );
}
