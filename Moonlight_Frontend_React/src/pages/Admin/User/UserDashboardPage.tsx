import { useFetchUsers } from "../../../hooks/fetchItems/useFetchUsers"
import { useUserTable } from "../../../hooks/adminTables/useUserTable";
import { Table } from "../../../components/common/Generic/Table/Table";
import { Button } from "../../../components/common/Generic/Button/Button";
import { PlusIcon } from "@phosphor-icons/react";

export function UserDashboardPage(){
    const {users, isLoading, refetch, onPageChange, totalRows} = useFetchUsers();
    const {UserColumns} = useUserTable(refetch);
    
    return(
        <main className="pt-10 min-h-screen bg-gradient-to-b from-night-soft via-night to-night">
            <header className="mb-10 justify-self-center w-fit bg-white/5 text-white rounded-xl p-4 border border-white/8 backdrop-blur-sm">
                <h1 className="text-2xl text-center ">Tabela de Usuarios</h1>
            </header>

            <div className="container justify-self-center">
                <Table 
                    columns={UserColumns} 
                    data={users} 
                    isLoading={isLoading}
                    subHeader
                    subHeaderComponent={
                        <Button as="link" href="/admin/users/create" variant="cta" className="flex items-center gap-2 px-4 py-2 rounded-md">
                            <PlusIcon size={32} weight="thin" /> Cadastrar usuário
                        </Button>
                    }
                    onPageChange={onPageChange}
                    totalRows={totalRows} 
                />
            </div>
        </main>
    )
}