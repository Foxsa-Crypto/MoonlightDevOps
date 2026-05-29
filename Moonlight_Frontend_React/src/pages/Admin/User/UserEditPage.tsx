import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Card, CardHeader } from "../../../components/common/Generic/Card";
import { Button } from "../../../components/common/Generic/Button/Button";
import { UserEditForm } from "./sections/UserEditForm";
import { useLocation } from "react-router-dom";
import type { User } from "../../../@types/User";


export function UserEditPage() {
    const { state } = useLocation();
    const user: User = state.user;

    return(
        <main className="pt-10 min-h-screen bg-gradient-to-b from-night-soft via-night to-night">
            <Card variant="primary" className="flex flex-col mb-10 gap-10 border py-8 container justify-self-center">
                <CardHeader className="flex items-center gap-4">
                    <Button as="link" href="/admin/users" icon={<ArrowLeftIcon size={32} weight="thin" />} className="bg-white/10 p-2 text-white rounded-xl hover:bg-white/20"/>
                    <h1 className="text-2xl">Editar Usuario:</h1>
                </CardHeader>
                <hr />
                <UserEditForm user={user}/>
            </Card>  
        </main>
        
    )
}