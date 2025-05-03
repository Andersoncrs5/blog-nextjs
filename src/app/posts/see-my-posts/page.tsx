'use client'
import Btn from "@/components/Btn.component";
import Header from "@/components/Header.component";
import Line from "@/components/Line.component";
import Load from "@/components/Load.component";
import PostDto from "@/dtos/PostDTOs/PostDto";
import api from "@/services/api";
import { useState } from "react";

export default function SeeMyPosts() {
    const [load, setLoad] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostDto[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    

    async function getPost() {
        setLoad(true);
        const res = await api.get('/post/findAllOfUser');

        setLoad(true);
    }

    return (
        <div>
            <Header title="My Posts" >
                <Btn url={""} color={"white"} name={"BACK"} />
            </Header>
            {!load ?
                    posts.map((e: PostDto) => (
                        <div className="my-2 p-3 border rounded" key={e.id}>
                        <h1 className="text-white">{e.title}</h1>
                        <Line width={""} color="white" more={"my-2"} />
                        
                        <div className={"flex justify-between items-center"} >
                            <Btn url={`posts/see-post/${e.id}`} color={""} name={"See posts"}  />
                        </div>
                        </div>
                    ))
                :
                    <Load msg="Loading posts" />
            }
        </div>
    );
}