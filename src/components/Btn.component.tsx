import Link from "next/link";
import { clsx } from "clsx";

interface Values {
  url: string;
  color: string;
  name: string;
  colorHover?: string;
  padding?: string;
  more?: string;
  colorTextHover?: string;
}

export default function Btn(props: Values) {
  const bg = `bg-${String(props.color)}`;
  const hover: string = `hover:bg-${props.colorHover||'white'} hover:text-${props.colorTextHover||'black'}`;
  const padding = `p-${String(props.padding||1)}`;

  return (
    <Link
      href={`/${props.url}`}
      className={clsx(bg, hover, " border rounded pe-3 ps-3 ", padding, props.more)}
    >
      {props.name}
    </Link>
  );
}
