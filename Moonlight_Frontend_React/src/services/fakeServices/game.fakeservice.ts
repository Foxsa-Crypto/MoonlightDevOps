import type { GameWithCategories, PaginatedResponse } from "../../@types";
import { mockGameItems } from "./mockItems/mockGameItems";

export async function fetchGamesMock(page: number, limit: number): Promise<PaginatedResponse<GameWithCategories>>{
    await new Promise(resolve => setTimeout(resolve, 500));
    const offset = (page - 1) * limit;
    const paginated = mockGameItems.slice(offset, offset + limit); // fatia o array igual o OFFSET do SQL

    return {
        data: paginated,
        total: mockGameItems.length,
        page,
        totalPages: Math.ceil(mockGameItems.length / limit)
    };
}

export async function fetchGameByIdMock(id_game: number): Promise<GameWithCategories> {
  await new Promise(resolve => setTimeout(resolve, 500));

    const game = mockGameItems.find(game => game.id_game === id_game);

    if(!game){
      throw new Error("Game não encontrado");
    }

    return game;
}