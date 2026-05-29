import type { CreateGamePayload, CreateGameResponse,  DeleteGameResponse, GameWithCategories, PaginatedResponse, UpdateGamePayload, UpdateGameResponse } from "../../@types";
import type { Game } from "../../@types/Game";
import { sanitizeData } from "../../utils/sanitizer/sanitizer";
import { api } from "../api";
import { fetchGameByIdMock, fetchGamesMock } from "../fakeServices/game.fakeservice";


export async function fetchGames(page = 1, limit = 10): Promise<PaginatedResponse<GameWithCategories>> {
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return fetchGamesMock(page, limit);
    }
    const response = await api.get(`/api/games`, { params: { page, limit } });
    return response.data;
}

export async function fetchGameById(id_game: number): Promise<GameWithCategories> {
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return fetchGameByIdMock(id_game);
    }
    const response = await api.get(`/api/games/${id_game}`);
    return response.data;
}

export async function fetchGamesByTitle(title: string): Promise<Game[] | Game> {
    const response = await api.get(`/api/games`, {
        params: { title }
    });

    return response.data;
}

export async function createGame(data: CreateGamePayload): Promise<CreateGameResponse>{
    const cleanData = sanitizeData(data);
    const response = await api.post(`/api/games`, cleanData);
    return response.data;
}


export async function updateGame(id_game: number, data: UpdateGamePayload): Promise<UpdateGameResponse> {
    const cleanData = sanitizeData(data);
    const response = await api.put(`/api/games/${id_game}`, cleanData);
    return response.data;
}

export async function deleteGame(id_game: number): Promise<DeleteGameResponse> {
    const response = await api.delete(`/api/games/${id_game}`);
    return response.data;
}
