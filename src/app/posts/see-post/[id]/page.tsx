'use client'
import Btn from "@/components/Btn.component";
import Line from "@/components/Line.component";
import Load from "@/components/Load.component";
import PostDto from "@/dtos/PostDTOs/PostDto";
import api from "@/services/api";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SeePost() {
  const router: AppRouterInstance = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [post, setPost] = useState<PostDto>({});
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [id]);

  async function getPost() {
    const res = await api.get(`/post/${id}`);
    if (res.status === 200) {
      setPost(res.data);
    }

    if (res.status === 404) {
        setLoad(true);
        router.push("/");
    }

    setLoad(true);
  }

  return (
    <div>
      
      {load ? (
        <div className="text-white mt-3 text-center p-2 w-[90%] mx-auto border rounded-2xl ">
          <h1 className={""} >{post.title}</h1>
          <Line more={"my-2"} />
          <p>{post.content}</p>
          <Line more={"my-2"} />
          <div className={"flex justify-between items-center"} >
            <Btn url={""} color={""} name={"BACK"}  />
          </div>
        </div>
      ) : (
        <Load msg={"Loading post"} />
      )}
    </div>
  );
}
