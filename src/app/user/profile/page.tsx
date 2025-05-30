import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function Profile() {
    const router: AppRouterInstance = useRouter();
    

    useEffect(() => {
        logged()
    }, []);

    
    async function logged() {
        const token: string | null = localStorage.getItem("token");

        if (!token) {
            router.push('/')
        }
    }

    return <h1> Profile of user </h1>
}