'use client'

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { AxiosResponse } from "axios";

import Alert from "@/components/Alert.component";
import Btn from "@/components/Btn.component";
import BtnSubmit from "@/components/BtnSubmit.component";
import CustomInput from "@/components/CustomInput.component";
import CustomTextarea from "@/components/CustomTextarea.component";
import ErrorForm from "@/components/ErrorForm.component";

import PostDto from "@/dtos/PostDTOs/PostDto";
import UpdatePostDto from "@/dtos/PostDTOs/UpdatePostDto.dto";
import CategoryDto from "@/dtos/CategoryDto/CategoryDto.dto";

import api from "@/services/api";

export default function UpdatePost() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const [post, setPost] = useState<PostDto | null>(null);
    const [categories, setCategories] = useState<CategoryDto[]>([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const [msgAlert, setMsgAlert] = useState("");
    const [colorAlert, setColorAlert] = useState("");
    const [alert, setAlert] = useState(false);

    const [errorForm, setErrorForm] = useState(false);
    const [msgErrorForm, setMsgErrorForm] = useState<string[]>([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const showAlert = useCallback((message: string, color: string, time = 4000) => {
        setMsgAlert(message);
        setColorAlert(color);
        setAlert(true);
        setTimeout(() => setAlert(false), time);
    }, []);

    const turnOffErrorForm = useCallback((time = 10000) => {
        setTimeout(() => setErrorForm(false), time);
    }, []);

    const checkAuth = useCallback(() => {
        const token = localStorage.getItem("token");
        if (!token) router.push("/");
    }, [router]);

    const getCategories = useCallback(async () => {
        try {
            const res: AxiosResponse<CategoryDto[]> = await api.get('/category');
            setCategories(res.data);
        } catch (error: any) {
            if (error?.response?.status === 500) {
                console.error(error);
                showAlert("Error fetching categories. Try again later.", "red");
            }
        }
    }, [showAlert]);

    const getPost = useCallback(async () => {
        if (!id) {
            showAlert("Invalid post ID.", "yellow");
            router.back();
            return;
        }

        try {
            const res: AxiosResponse<PostDto> = await api.get(`/post/${id}`);
            const data = res.data;

            setPost(data);
            setTitle(data.title || '');
            setCategory(data.category || '');
            setContent(data.content || '');

        } catch (error: any) {
            const status = error?.response?.status;

            if (status === 404) {
                showAlert("Post not found", "yellow", 5000);
            } else {
                showAlert("Server error. Please try again later.", "red", 6000);
            }

            router.back();
        }
    }, [id, router, showAlert]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const updatedData: UpdatePostDto = { title, content, category };

        try {
            const res = await api.put(`/post/${id}`, updatedData);
            const data = res.data;

            setPost(data);
            setTitle(data.title);
            setCategory(data.category);
            setContent(data.content);

            showAlert("Post updated successfully!", "green");

            router.back();
        } catch (error: any) {
            const status = error?.response?.status;

            if (status === 400) {
                setMsgErrorForm(error.response.data.message);
                setErrorForm(true);
                turnOffErrorForm();
            } else if (status === 401) {
                router.push('/');
            } else {
                console.error("Unexpected error:", error);
                showAlert("Error updating the post. Try again later.", "red", 5000);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        checkAuth();
        getCategories();
        getPost();
    }, [checkAuth, getCategories, getPost]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="border p-3 text-center shadow-md w-full max-w-[60%]">
                {alert && <Alert color={colorAlert} name={msgAlert} />}
                {errorForm && <ErrorForm data={msgErrorForm} />}

                <form onSubmit={handleSubmit}>
                    <CustomInput
                        type="text"
                        nameLabel="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Write your title"
                    />

                    <CustomTextarea
                        nameLabel="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content of post"
                        rows={3}
                    />

                    <div className="mt-3">
                        <select
                            className="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" disabled>CHOOSE CATEGORY</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <BtnSubmit isSubmitting={isSubmitting} />
                        <Btn url="/" color="gray-300" name="BACK" />
                    </div>
                </form>
            </div>
        </div>
    );
}
