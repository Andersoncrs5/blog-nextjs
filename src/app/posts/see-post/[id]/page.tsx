'use client'
import Btn from "@/components/Btn.component";
import BtnFunc from "@/components/BtnFunc.component";
import Line from "@/components/Line.component";
import Load from "@/components/Load.component";
import PostDto from "@/dtos/PostDTOs/PostDto";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import { Params } from "next/dist/server/request/params";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SeePost() {
  const router: AppRouterInstance = useRouter();
  const params: Params = useParams();
  const id: string = params?.id as string;

  const [post, setPost] = useState<PostDto>({});
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [id]);

  async function getPost() {
    try {
      const res: AxiosResponse<any, any> = await api.get(`/post/${id}`);
      if (res.status === 200) {
        setPost(res.data);
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        setLoad(true);
        router.push("/");
      }
    } finally {
      setLoad(true);
    }
  }

  async function toFavorite(id: any): Promise<any> {
    try {
      if (!id) {
        console.error('Id come null')
        return;
      }



    } catch (err: any) {

    }
  }

  return (
    <div>
      
      {load ? (
        <div className="text-white mt-3 p-3 w-[90%] mx-auto border rounded-2xl ">
          <h1 className={"mx-auto text-center"} >{post.title}</h1>
          <Line more={"my-2"} />
          <p>{post.content}</p>
          <Line more={"my-2"} />
          <div className={"flex justify-between items-center"} >
            <div>
              <Btn url={""} color={""} name={"BACK"}  />
              <BtnFunc name={"Favorite"} more={"ms-1"} color={""} onClick={() => toFavorite(post.id)} />
            </div>
          </div>
        </div>
      ) : (
        <Load msg={"Loading post"} />
      )}
    </div>
  );
}
