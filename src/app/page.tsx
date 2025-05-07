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
import BtnFunc from "@/components/BtnFunc.component";
import Alert from "@/components/Alert.component";

export default function Home() {
  const [logged, setLogged] = useState(false);
  const [load, setLoad] = useState(false);
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [msgAlert, setMsgAlert] = useState('');
  const [colorAlert, setColorAlert] = useState('');
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    getPosts(currentPage);
    log();
    getAllCategories();
  }, [currentPage]);

  async function getPosts(page = 1, limit = 10) {
    try {
      setLoad(true);
      const res: AxiosResponse = await api.get(`/post?page=${page}&limit=${limit}`);
      if (res.status === 200) {
        setPosts(res.data.data);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoad(false);
    }
  }

  function log() {
    const token = localStorage.getItem("token");
    setLogged(!!token);
  }

  async function getAllCategories() {
    try {
      const res: AxiosResponse = await api.get('/category');
      if (res.status === 200) {
        setCategories(res.data);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 500) {
        showAlert("Error in server! Please try again later.", "red", 6000);
      }
    }
  }

  function getAllPostsByCategory(category: string) {
    console.log('Filtrar por categoria:', category);
  }

  async function logout() {
    try {
      localStorage.clear();
      setLogged(false);
      showAlert('bye bye', 'green', 6000);
    } catch (err: any) {
      showAlert('Error the make logout', 'red', 6000);
    }
  }

  function showAlert(message: string, color: string, time = 4000) {
    setMsgAlert(message);
    setColorAlert(color);
    setAlert(true);
    setTimeout(() => setAlert(false), time);
  }

  function handlePagination(direction: 'next' | 'prev') {
    setCurrentPage(prev =>
      direction === 'next' ? Math.min(prev + 1, totalPages) : Math.max(prev - 1, 1)
    );
  }

  return (
    <div>
      <Header title="Blog">
        {!logged && <Btn url="auth/login" color="white" name="Sign" />}
      </Header>

      {alert && <Alert color={colorAlert} name={msgAlert} />}

      <div className="flex flex-wrap">
        <div className="w-2/10 px-2">
          <div className="p-2">
            {categories.length > 0 ? (
              categories.map((e: CategoryDto) => (
                <div key={e.id}>
                  <BtnFunc
                    more={"block text-center mt-2 w-[100%]"}
                    padding="1.5"
                    name={e.name}
                    color="white"
                    onClick={() => getAllPostsByCategory(e.name)}
                  />
                </div>
              ))
            ) : (
              <div className="p-5 text-center">
                <h3>NO CATEGORIES</h3>
              </div>
            )}
          </div>
        </div>

        <div className="w-6/10 px-2 border-x">
          {!load ? (
            <div className="p-2">
              {posts.map((e: PostDto) => (
                <div className="my-2 p-3 border" key={e.id}>
                  <h1 className="text-white">{e.title}</h1>
                  <Line width="" color="white" more="my-2" />
                  <div className="flex justify-between items-center">
                    <Btn url={`posts/see-post/${e.id}`} color="" name="See posts" />
                  </div>
                </div>
              ))}

              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() => handlePagination('prev')}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                  Back
                </button>

                <span className="text-white">{currentPage} / {totalPages}</span>

                <button
                  onClick={() => handlePagination('next')}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <Load />
          )}
        </div>

        <div className="w-2/10 px-2">
          {logged && <Menu> 
            <BtnFunc color={"white"} name={"LOGOUT"} more={"block text-center mt-2 w-[100%]"} padding="1.5" onClick={logout}  /> 
            </Menu>  }
        </div>
      </div>
    </div>
  );
}
