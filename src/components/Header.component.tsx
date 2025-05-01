import Btn from "./Btn.component";

interface Types {
    title: string
    more?: string
}

export default function Header(props: Types) {
    return (
        <div className={`flex flex-row p-2 border-2 text-center ${props.more}`}  >
            <div className="basis-64">
                <h1> {props.title} </h1>
            </div>
            <div className="basis-128"></div>
            <div className="basis-64">
            </div>
        </div>
    );
}