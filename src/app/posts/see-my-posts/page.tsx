'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AxiosResponse } from "axios";

import api from "@/services/api";
import Btn from "@/components/Btn.component";
import Header from "@/components/Header.component";
import Line from "@/components/Line.component";
import Load from "@/components/Load.component";
import Alert from "@/components/Alert.component";
import PostDto from "@/dtos/PostDTOs/PostDto";
import BtnFunc from "@/components/BtnFunc.component";

export default function SeeMyPosts() {
    const router: AppRouterInstance = useRouter();

    const [posts, setPosts] = useState<PostDto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<{ visible: boolean; message: string; color: string }>({
        visible: false,
        message: '',
        color: '',
    });

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        validateToken();
        fetchPosts();
    }, []);

    function showAlert(message: string, color: string, duration: number = 4000) {
        setAlert({ visible: true, message, color });
        setTimeout(() => {
            setAlert({ ...alert, visible: false });
        }, duration);
    }

    async function validateToken() {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push('/');
        }
    }

    async function fetchPosts(page = 1, limit = 10) {
        try {
            setIsLoading(true);
            const res = await api.get(`/post/findAllOfUser?limit=${limit}&page=${page}`)
            console.log(res.data)

            if (res.status === 200) {
                setPosts(res.data.data || []);
                setTotalPages(res.data.totalPages || 1);
                setCurrentPage(res.data.currentPage);
                setTotalPages(res.data.totalPages);
            }

        } catch (error: any) {
            const status = error?.response?.status;
            const message = error?.response?.data || "Unexpected error";

            if (status === 404 || status === 500) {
                showAlert(message, 'red', 6000);
                router.push('/');
            } else {
                console.error("Unhandled error:", error);
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function deletePost(id: any) {
        try {
            if(!id) {
                console.error('Id come null')
                showAlert('Error the to delete post! Please try again later', 'red', 6000)
                return;
            }
        } catch (err: any) {

        }
    }

    function handlePagination(direction: 'next' | 'prev') {
        setCurrentPage(prev =>
            direction === 'next' ? Math.min(prev + 1, totalPages) : Math.max(prev - 1, 1)
        );
    }

    return (
        <div>
            <Header title="My Posts">
                <Btn url={""} color={"white"} name={"BACK"} padding={"1.5"} />
            </Header>

            {alert.visible && <Alert color={alert.color} name={alert.message} />}

            {isLoading ? (
                <Load msg="Loading posts" />
            ) : posts.length === 0 ? (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center w-full max-w-md">
                        <h1 className="text-white text-xl font-semibold">No Posts</h1>
                    </div>
                </div>
            ) : (
                <div className={"w-[70%] mx-auto"} >
                    {posts.map((post: PostDto) => (
                        <div className="my-2 p-3 border rounded" key={post.id}>
                            <h1 className="text-white text-lg font-bold">{post.title}</h1>
                            <Line width={""} color="white" more="my-2" />
                            <div className="flex justify-between items-center">
                                <div className={""} >
                                    <Btn url={`posts/see-post/${post.id}`} color="" name="See post" />
                                    <Btn url={`posts/update-post/${post.id}`} color="" name={"Update Post"} more="ms-1" />
                                    <BtnFunc onClick={() => deletePost(post.id) } color="" name={"Delete Post"} more="ms-1 border-red" />
                                </div>
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
            )}
        </div>
    );
}
