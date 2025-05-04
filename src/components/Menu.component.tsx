import api from "@/services/api";
import Btn from "./Btn.component";
import { AxiosResponse } from "axios";
import BtnFunc from "./BtnFunc.component";

async function logout() {

}

export default function Menu() {

    return (
        <div className={"p-2 m-1 border"} >
            <Btn url={"posts/create-post"} color={"white"} name={"CREATE NEW POST"}  padding="1.5" more={"block text-center mt-2"}  />
            <Btn url={"post/see-my-posts"} color={"white"} name={"SEE MY POSTS"} more={"block text-center mt-2"} padding="1.5"  />
            <Btn url={"post/see-my-favorite-posts"} color={"white"} name={"SEE MY FAVORITE POSTS"} more={"block text-center mt-2"} padding="1.5"  />
            <BtnFunc name={"LOGOUT"} color={""} onClick={logout} more={"block text-center mt-2 w-[100%]"} padding="1.5"/>
        </div>
    );
}