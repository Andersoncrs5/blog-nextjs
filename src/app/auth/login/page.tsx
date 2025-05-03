'use client';
import Alert from "@/components/Alert.component";
import Btn from "@/components/Btn.component";
import BtnSubmit from "@/components/BtnSubmit.component";
import ErrorForm from "@/components/ErrorForm.component";
import LoginDto from "@/dtos/UserDTOs/LoginDto";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
    const router: AppRouterInstance = useRouter();
    
    const [email, setEmail] = useState<string>('');
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
    
      const data: LoginDto = { email, password };
    
      try {
        const res: AxiosResponse<any, any> = await api.post('/user/login', data);
    
        if (res.status === 200) {
          localStorage.setItem('token', res.data.access_token);
          localStorage.setItem('refresh_token', res.data.refresh_token);
          setColorAlert('green');
          setMsgAlert('User logged in with success!');
          setAlert(true);
          await turnOffAlert();
          await clearInputs();
          router.push('/');
        }
      } catch (error: any) {
        setIsSubmitting(false);
    
        if (error.response) {
          if (error.response.status === 400) {
            setMsgErrorForm(error.response.data.message);
            setErrorForm(true);
            await turnOffErrorForm();
          } 
          if (error.response.status === 401) {
            setColorAlert('red-400');
            setMsgAlert(error.response.data.message || 'Invalid credentials');
            setAlert(true);
            await turnOffAlert();
          } 
          if (error.response.status === 500) {
            setMsgAlert('Error while logging in. Try again later.');
            setColorAlert('red');
            setAlert(true);
            await turnOffAlert();
            await clearInputs();
          }
        } else {
          setMsgAlert('Unknown error occurred.');
          setColorAlert('red');
          setAlert(true);
        }
      }
    }    
    

    async function turnOffAlert() {
        setTimeout(() => {
            setAlert(false)
        }, 5000)
    }

    async function turnOffErrorForm() {
      setTimeout(() => {
          setErrorForm(false)
      }, 10000)
  }

    async function clearInputs() {
        setEmail('');
        setPassword('');
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center border p-6 shadow-md w-full max-w-[60%] rounded">
            {alert && <Alert color={colorAlert} name={msgAlert} />}
            {errorForm && <ErrorForm data={msgErrorForm} /> }
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-left">
                <label htmlFor="email" className="block mb-1 font-medium">Email:</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  className="w-full p-2 bg-black rounded border"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
      
              <div className="text-left">
                <label htmlFor="password" className="block mb-1 font-medium">Password:</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password"
                  className="w-full p-2 bg-black rounded border"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
      
              <div className="flex justify-between items-center mt-1">
                <BtnSubmit isSubmitting={isSubmitting}  > 
                    <Btn url={""} color={"black"} name={"Back"} more={"ms-2"} />
                </BtnSubmit>
                
                <p className="text-sm">
                  Don't have an account?{' '}
                  <Btn url={"auth/register"} color={"black"} name={"Register"} />
                </p>
              </div>
            </form>
          </div>
        </div>
      );
      
}