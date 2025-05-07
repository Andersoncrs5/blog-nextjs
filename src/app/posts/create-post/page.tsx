'use client'
import Alert from "@/components/Alert.component";
import Btn from "@/components/Btn.component";
import BtnSubmit from "@/components/BtnSubmit.component";
import CustomInput from "@/components/CustomInput.component";
import CustomTextarea from "@/components/CustomTextarea.component";
import ErrorForm from "@/components/ErrorForm.component";
import CreatePostDto from "@/dtos/PostDTOs/CreatePostDto.dto";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function CreatePost() {
    const router: AppRouterInstance = useRouter();

    const [category, setCategory] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const [msgAlert, setMsgAlert] = useState<string>('');
    const [colorAlert, setColorAlert] = useState<string>('');
    const [alert, setAlert] = useState<boolean>(false);

    const [errorForm, setErrorForm] = useState<boolean>(false);
    const [msgErrorForm, setMsgErrorForm] = useState<string[]>([]);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryDto[]>([]);

    useEffect(() => {
        logged();
        getCategories();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data: CreatePostDto = {
                title,
                content,
                category
            }

            const res: AxiosResponse<any, any> = await api.post('/post', data);

            if (res.status === 201) {
                setIsSubmitting(false);
                setColorAlert('green');
                setMsgAlert('Post created with success!');
                setAlert(true);
                turnOffAlert();
                router.push('/');
            }
        } catch (error: any) {
            setIsSubmitting(false);

            if (error.response) {
                const status = error.response.status;

                if (status === 500) {
                    setColorAlert('red');
                    setMsgAlert('Error creating the post! Please try again later.');
                    console.error(error);
                    setAlert(true);
                    turnOffAlert(6000);
                }

                if (status === 401) {
                    router.push('/');
                }

                if (status === 400) {
                    setMsgErrorForm(error.response.data.message);
                    setErrorForm(true);
                    turnOffErrorForm();
                }
            } else {
                console.error("Erro inesperado:", error);
            }
        }
    }

    async function getCategories() {
        try {
            const res: AxiosResponse<any, any> = await api.get('/category');

            if (res.status === 200) {
                setCategories(res.data);
            }
        } catch (error: any) {
            if (error.response?.status === 500) {
                setMsgAlert("Error in server! Please try again later.");
                setColorAlert('red');
                console.error(error);
                setAlert(true);
                turnOffAlert(6000);
            }

        }
    }

    function turnOffAlert(time?: number) {
        setTimeout(() => {
            setAlert(false);
        }, time || 4000);
    }

    function turnOffErrorForm(time?: number) {
        setTimeout(() => {
            setErrorForm(false);
        }, time || 10000);
    }

    function logged() {
        try {
            const token: string | null = localStorage.getItem("token");
            if (!token) {
                router.push('/');
            }
        } catch (error) {
            console.error("Erro ao verificar token:", error);
            router.push('/');
        }
    }

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
                        value={content}
                        nameLabel="Content"
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
                            {categories.map((e: CategoryDto) => (
                                <option key={e.id} value={e.name}>
                                    {e.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <BtnSubmit isSubmitting={isSubmitting} />
                        <Btn url={"/"} color={"gray-300"} name={"BACK"} />
                    </div>
                </form>
            </div>
        </div>
    );
}
