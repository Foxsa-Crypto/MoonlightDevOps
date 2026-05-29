import { useEffect, useState } from "react";
import { fetchUsers } from "../../services/realServices/user.service";
import type { User } from "../../@types/User";
export function useFetchUsers(){
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [version, setVersion] = useState(0);

    useEffect(() => {
        const start = Date.now();
        fetchUsers(page, 10).then(({ data, total }) => {
            const gapElapsed = Date.now() - start;
            const minimumTime = 600;
            setTimeout(() => {
                setUsers(data);
                setTotalRows(total);
                setIsLoading(false);
            }, Math.max(minimumTime - gapElapsed, 0));
        
        })
        .catch(() => setIsLoading(false));
    }, [page, version]);

    const refetch = () => setVersion(v => v + 1);

    return { users, isLoading, totalRows, onPageChange: setPage, refetch }
}