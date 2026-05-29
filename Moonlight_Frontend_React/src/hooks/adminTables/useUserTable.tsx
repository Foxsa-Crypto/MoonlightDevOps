import type { TableColumn } from "react-data-table-component";
import type { User } from "../../@types/User";
import { PencilIcon, TrashIcon } from "@phosphor-icons/react";
import { Button } from "../../components/common/Generic/Button/Button";
import { useEffect, useRef, useState } from "react";
import { deleteUser } from "../../services/realServices/user.service";
import { useNavigate } from "react-router-dom";
import { formatCPF } from "../../utils/Validation/dataRules/cpf";
import { useBreakpoint } from "../breakpoints/useBreakpoint";

export function useUserTable(refetch: () => void){
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {isDesktop} = useBreakpoint();
    
        useEffect(() => {
            function handleClickOutside(event: MouseEvent){
                if(ref.current && !ref.current.contains(event.target as Node) && isDesktop){
                    setConfirmDeleteId(null);
                }
            }
    
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [isDesktop]);

    const UserColumns: TableColumn<User>[] = [
        { name: 'Nome', selector: (row: User) => row.name, sortable: true },
        { name: 'Email', selector: (row: User) => row.email },
        { name: 'Cpf', selector: (row: User) => formatCPF(row.cpf) },
        { name: 'Tipo', selector: (row: User) => row.type },
        {
            name: 'Ações',
            cell: (row: User) => (
            <>
                <Button variant="transparent" onClick={() => handleEdit(row)}>{<PencilIcon size={32}/>}</Button>
                <Button variant="transparent" onClick={() => setConfirmDeleteId(row.id_user!)}>{<TrashIcon size={32}/>}</Button>
            </>
            ),
        },
        {
            name: 'Feedback',
            cell: (row: User) => (
                <>
                    {confirmDeleteId === row.id_user && (
                        <div ref={ref} className="p-4 flex flex-col">
                            <p className="text-white">Tem certeza?</p>
                            <div className="flex max-lg:flex-col gap-2">
                                <Button className="rounded-md border p-2 border-white/25 max-lg:active:bg-white max-lg:active:text-night lg:hover:bg-white lg:hover:text-night transition-all duration-300" onClick={() => handleDelete(row.id_user!)}>Sim</Button>
                                <Button className="rounded-md border p-2 border-white/25 max-lg:active:bg-white max-lg:active:text-night lg:hover:bg-white lg:hover:text-night transition-all duration-300" onClick={() => setConfirmDeleteId(null)}>Não</Button>
                            </div>
                        </div>
                    )}

                    {error && confirmDeleteId === row.id_user && (
                        <p className="text-sm text-red-400 text-center">{error}</p>
                    )}

                    {confirmDeleteId !== row.id_user && !error && '...'}
                </>
            )
        }
    ]

    const handleEdit = (row: User) => { 
        navigate(`/admin/users/edit/${row.id_user}`, { state: {user: row} });
    }
    const handleDelete = async (id_user: number) => {
        try{
            await deleteUser(id_user);
            setConfirmDeleteId(null)
            refetch();
        } catch(err){
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            setError(message);
        }
    }

    return {UserColumns};
}