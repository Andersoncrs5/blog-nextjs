'use client'
import Alert from "@/components/Alert.component";
import Btn from "@/components/Btn.component";
import BtnSubmit from "@/components/BtnSubmit.component";
import CustomInput from "@/components/CustomInput.component";
import CustomTextarea from "@/components/CustomTextarea.component";
import ErrorForm from "@/components/ErrorForm.component";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function CreatePost() {
    const router: AppRouterInstance = useRouter();

    

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const [msgAlert, setMsgAlert] = useState<string>('');
    const [colorAlert, setColorAlert] = useState<string>('');
    const [alert, setAlert] = useState<boolean>(false);

    const [errorForm, setErrorForm] = useState<boolean>(false);
    const [msgErrorForm, setMsgErrorForm] = useState<string[]>([]);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        logged()
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res: AxiosResponse<any, any> = await api.post('/post');

            if (res.status === 201) {
                setIsSubmitting(false);
                setColorAlert('green');
                setMsgAlert('Post created with success!');
                setAlert(true);
                turnOffAlert();
                router.push('/')
            }

            setIsSubmitting(false);
        } catch (error: any) {


            if (error.response.status === 500) {
                setColorAlert('red');
                setMsgAlert('Error the create th post! Please try again later');
                console.error(error);
                setAlert(true);
                turnOffAlert(6000);
            }

            if (error.response.status === 401) {
                router.push('/');
            }

            if (error.response.status === 400) {
                setIsSubmitting(false);
                setMsgErrorForm(error.response.data.message);
                setErrorForm(true);
                turnOffErrorForm();
            }

            setIsSubmitting(false);
        }
    }

    async function turnOffAlert(time?: number) {
        setTimeout(() => {
            setAlert(false)
        }, time || 4000)
    }

    async function turnOffErrorForm() {
        setTimeout(() => {
            setErrorForm(false)
        }, 10000)
    }

    async function logged() {
        const token: string | null = localStorage.getItem("token");

        if (!token) {
            router.push('/')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className=" border p-3 text-center shadow-md w-full max-w-[60%] ">
                {alert && <Alert color={colorAlert} name={msgAlert} /> }
                {errorForm && <ErrorForm data={msgErrorForm} /> }
                <form onSubmit={handleSubmit} >
                    <CustomInput 
                        type={"text"}
                        nameLabel={"Title"}
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Write your title"
                    />
                    <CustomTextarea 
                        value={content} 
                        nameLabel={"Content"}
                        onChange={(e) => setContent(e.target.value)}          
                        placeholder={"Content of post"}
                        rows={3}

                    />
                    <div className={"flex justify-between items-center mt-1"} >
                        <div>
                            <BtnSubmit isSubmitting={isSubmitting} />
                        </div>
                        <div>
                            <Btn url={""} color={""} name={"BACK"}  />
                        </div>
                    </div>
                </form>        
            </div>
        </div>
    );
}