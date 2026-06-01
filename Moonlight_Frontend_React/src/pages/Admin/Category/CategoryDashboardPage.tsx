
import { Table } from "../../../components/common/Generic/Table/Table";
import { Button } from "../../../components/common/Generic/Button/Button";
import { PlusIcon, WarningIcon } from "@phosphor-icons/react";
import { ConfirmModal } from "../../../components/common/Generic/ConfirmModal";
import { useFetchCategoriesTable } from "../../../hooks/fetchItems/table/useFetchCategoriesTable";
import { useCategoryTable } from "../../../hooks/tables/useCategoryTable";
import { useMemo } from "react";
import type { CategoryPaginatedQueryPayload } from "../../../@types/category/category.payload";

export function CategoryDashboardPage(){

    const query: CategoryPaginatedQueryPayload = useMemo(() => ({
        page: 1,
        limit: 5,
        random: false,
        name: undefined,
    }), []);

    const {categories, isLoading, refetch, onPageChange, totalRows} = useFetchCategoriesTable(query);
    const {CategoryColumns, confirmDeleteId, setConfirmDeleteId, handleDelete} = useCategoryTable(refetch);
    
    return(
        <main className="pt-10 min-h-screen bg-gradient-to-b from-night-soft via-night-soft to-night">

            { confirmDeleteId && 
                <ConfirmModal 
                    icon={
                        <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                            <WarningIcon size={18} color="#f87171" />
                        </div>
                    }
                    title="Apagar Registro" 
                    message="Tem certeza de que deseja apagar este registro?" 
                    onConfirm={() => handleDelete(confirmDeleteId)} 
                    onCancel={() => setConfirmDeleteId(null)} 
                />
            }

            <header className="mb-10 justify-self-center w-fit bg-white/5 text-white rounded-xl p-4 border border-white/8 backdrop-blur-sm">
                <h1 className="text-2xl text-center ">Tabela de Categorias</h1>
            </header>

            <div className="container justify-self-center">
                <Table 
                    columns={CategoryColumns} 
                    data={categories || []} 
                    isLoading={isLoading}
                    subHeader
                    subHeaderComponent={
                        <Button as="link" href="/admin/categories/create" variant="cta" className="flex items-center gap-2 px-4 py-2 rounded-md">
                            <PlusIcon size={32} weight="thin" /> Cadastrar Categoria
                        </Button>
                    }
                    onPageChange={onPageChange}
                    totalRows={totalRows} 
                />
            </div>
        </main>
    )
}