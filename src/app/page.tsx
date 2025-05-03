'use client'
import { useEffect, useState } from "react";
import Btn from "@/components/Btn.component";
import Header from "@/components/Header.component";
import PostDto from "@/dtos/PostDTOs/PostDto";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import Menu from "@/components/Menu.component";
import Line from "@/components/Line.component";
import Load from "@/components/Load.component";

export default function Home() {
  const [logged, setLogged] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    getPosts(currentPage);
    log();
  }, [currentPage]);

  async function getPosts(page = 1, limit = 10) {
    setLoad(true);
    const res: AxiosResponse<any, any> = await api.get(`/post?page=${page}&limit=${limit}`);

    if (res.status === 200) {
      setPosts(res.data.data);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    }

    setLoad(false);
  }

  async function log() {
    const token = localStorage.getItem("token");
    if (token) {
      setLogged(true);
    }
  }

  return (
    <div>
      <Header title="Blog">
        {!logged && <Btn url={"auth/login"} color={"white"} name={"Sign"} /> }
      </Header>

      <div className={"flex flex-wrap "}>
        <div className={"w-2/9 px-2"}>
          <div className={"bg-gray-200 p-4"}>Coluna 1</div>
        </div>
        <div className={"w-5/9 px-2"}>
          {!load ? 
            <div className={"p-2"}>
            {posts.map((e: PostDto) => (
              <div className="my-2 p-3 border rounded" key={e.id}>
                <h1 className="text-white">{e.title}</h1>
                <Line width={""} color="white" more={"my-2"} />
                
                <div className={"flex justify-between items-center"} >
                  <Btn url={`posts/see-post/${e.id}`} color={""} name={"See posts"}  />
                </div>
              </div>
            ))}

            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                BAck
              </button>

              <span className="text-white">{currentPage} / {totalPages}</span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
            </div>
          :
            <Load />
          }
        </div>
        <div className={"w-2/9 px-2"}>
          <div className={""}>
            {logged && <Menu /> }
          </div>
        </div>
      </div>



      
    </div>
  );
}
