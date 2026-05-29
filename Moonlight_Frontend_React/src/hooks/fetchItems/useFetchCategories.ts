import { useEffect, useState } from "react";
import { fetchCategories} from "../../services/realServices/category.service";
import type { Category } from "../../@types/Category";

export function useFetchCategories(){
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const start = Date.now();
        fetchCategories().then(data => {
            const gapElapsed = Date.now() - start;
            const minimumTime = 600;
            setTimeout(() => {
                setCategories(data);
                setIsLoading(false);
            }, Math.max(minimumTime - gapElapsed, 0));
        
        })
    }, []);

    return { categories, isLoading }
}