'use client';
import Alert from "@/components/Alert.component";
import Btn from "@/components/Btn.component";
import BtnSubmit from "@/components/BtnSubmit.component";
import ErrorForm from "@/components/ErrorForm.component";
import RegisterDto from "@/dtos/UserDTOs/RegisterDto";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Register() {
    const router: AppRouterInstance = useRouter();

    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [msgAlert, setMsgAlert] = useState<string>('');
    const [colorAlert, setColorAlert] = useState<string>('');
    const [alert, setAlert] = useState<boolean>(false);

    const [errorForm, setErrorForm] = useState<boolean>(false);
    const [msgErrorForm, setMsgErrorForm] = useState<string[]>([]);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        logged()
    }, []);

    
    async function logged() {
        const token: string | null = localStorage.getItem("token");

        if (token) {
            router.push('/')
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        const data: RegisterDto = {
            name,
            email,
            password
        }

        try {
            const res: AxiosResponse<any, any> = await api.post('/user', data)

            if (res.status === 201) {
                localStorage.setItem('token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                setIsSubmitting(false);
                setColorAlert('green')
                setMsgAlert('User created with success!');
                setAlert(true);
                await turnOffAlert();
                await clearInputs();
                router.push('/');
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setIsSubmitting(false);
                setMsgAlert('Error the make the register! Please try again later ');
                setColorAlert('red')
                setAlert(true);
                await turnOffAlert();
                await clearInputs();
            }

            if (error.response.status === 400) {
                setIsSubmitting(false);
                setMsgErrorForm(error.response.data.message);
                setErrorForm(true);
                turnOffErrorForm();
            }

        }
    }

    async function turnOffAlert() {
        setTimeout(() => {
            setAlert(false)
        }, 4000)
    }

    async function turnOffErrorForm() {
        setTimeout(() => {
            setErrorForm(false)
        }, 10000)
    }

    async function clearInputs() {
        setName('');
        setEmail('');
        setPassword('');
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="text-center border p-6 shadow-md w-full max-w-[60%] rounded">
                {alert && <Alert color={colorAlert} name={msgAlert} /> }
                {errorForm && <ErrorForm data={msgErrorForm} /> }
                
                <form onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="name">name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            id=""  
                            className="w-full p-2 bg-black rounded border"
                            value={name}
                            onChange={(e) => {setName(e.target.value)} }
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            id=""  
                            className="w-full p-2 bg-black rounded border"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)} }
                        />
                    </div>
                    <div>
                        <label htmlFor="password">password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            id=""  
                            className="w-full p-2 bg-black rounded border"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)} }
                        />
                    </div>
                    <div className="flex justify-between mt-2" >
                        <BtnSubmit isSubmitting={isSubmitting}  />
                        <Btn url={""} color={"black"} name={"Back"}  padding="" />
                    </div>
                </form>
            </div>
        </div>
    );
}