import { useEffect, useState } from "react";
import { fetchGames } from "../../services/realServices/game.service";
import type { GameWithCategories } from "../../@types";

export function useFetchGames(page = 1, limit = 10){
    const [games, setGames] = useState<GameWithCategories[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const start = Date.now();
        fetchGames(page, limit).then(response => {
            const gapElapsed = Date.now() - start;
            const minimumTime = 600;
            setTimeout(() => {
                setGames(response.data);
                setIsLoading(false);
            }, Math.max(minimumTime - gapElapsed, 0));
        
        })
    }, []);

    return { games, isLoading }
}