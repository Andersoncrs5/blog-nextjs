'use client';
import Alert from "@/components/Alert.component";
import BtnSubmit from "@/components/BtnSubmit.component";
import RegisterDto from "@/dtos/UserDTOs/RegisterDto";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const router: AppRouterInstance = useRouter();

    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [msgAlert, setMsgAlert] = useState<string>('');
    const [colorAlert, setColorAlert] = useState<string>('');
    const [alert, setAlert] = useState<boolean>(false);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        const data: RegisterDto = {
            name,
            email,
            password
        }

        const res: AxiosResponse<any, any> = await api.post('/user', data)

        if (res.status === 500) {
            setIsSubmitting(false);
        }

        if (res.status === 201) {
            localStorage.setItem('token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
            setIsSubmitting(false);
            setMsgAlert('User created with success!');
            setAlert(true);
            turnOffAlert();
            router.push('/');
        }

    }

    async function turnOffAlert() {
        setTimeout(() => {
            setAlert(false)
        }, 4000)
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="text-center shadow-md w-full max-w-md ">
                {alert && <Alert color={colorAlert} name={msgAlert} /> }
                <form onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="name">name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            id=""  
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
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)} }
                        />
                    </div>
                    <div>
                        <BtnSubmit isSubmitting={isSubmitting}  />
                    </div>
                </form>
            </div>
        </div>
    );
}