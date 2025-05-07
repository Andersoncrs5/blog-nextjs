import api from "@/services/api";
import Btn from "./Btn.component";
import { AxiosResponse } from "axios";
import BtnFunc from "./BtnFunc.component";

interface Types {
    children?: any
}

export default function Menu(props: Types) {

    return (
        <div className={"p-2 m-1"} >
            <Btn url={"posts/create-post"} color={"white"} name={"CREATE NEW POST"}  padding="1.5" more={"block text-center mt-2"}  />
            <Btn url={"posts/see-my-posts"} color={"white"} name={"SEE MY POSTS"} more={"block text-center mt-2"} padding="1.5"  />
            <Btn url={"posts/see-my-favorite-posts"} color={"white"} name={"SEE MY FAVORITE POSTS"} more={"block text-center mt-2"} padding="1.5"  />
            <Btn url={""} color={"white"} name={"SEE MY COMMENTS"} more={"block text-center mt-2"} padding="1.5"  />
            {props.children}
        </div>
    );
}