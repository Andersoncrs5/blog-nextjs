import clsx from "clsx"

interface Types {
    width?: string
    color?: string
    more?: string
}

export default function Line(props: Types) {
    const w: string = `w-[${props.width || '100'}%]`;
    const c: string = `bg-${props.color || 'white'}`;
    const m: string = `${props.more}`;

    return (
        <hr className={clsx(w,c, m, "mx-auto" )} />
    )
}