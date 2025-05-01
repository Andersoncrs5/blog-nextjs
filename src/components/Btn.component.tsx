import Link from "next/link";

interface values {
    url: string
    color: string
    name: string
    colorHover? : string
    padding?: string
    more?: string
}

export default function Btn(props: values) {
    return (
        <Link href={`/${props.url}`} className={` ${props.more} bg-${props.color} hover:bg-${props.colorHover || 'white' } border-2 rounded p-${props.padding || 1} pe-3 ps-3`}>
            {props.name}
        </Link>
        
    );
}