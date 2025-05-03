import api from "@/services/api";
import Btn from "./Btn.component";
import { AxiosResponse } from "axios";

export default function Menu() {

    return (
        <div className={"p-2 m-1 border"} >
            <Btn url={"posts/create-post"} color={"white"} name={"CREATE NEW POST"}  padding="1.5" more={"block text-center mt-2"}  />
            <Btn url={"post/see-my-posts"} color={"white"} name={"SEE MY POSTS"} more={"block text-center mt-2"} padding="1.5"  />
            <button className={"p-2 px-3 border rounded block"} >LOGOUT</button>
        </div>
    );
}