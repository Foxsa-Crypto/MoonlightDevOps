import type { CreateUserPayload, CreateUserResponse,  DeleteUserResponse, PaginatedResponse, UpdateMePayload, UpdateMeResponse, UpdateUserPayload, UpdateUserResponse } from "../../@types";
import type { User } from "../../@types/User";
import { sanitizeData } from "../../utils/sanitizer/sanitizer";
import { api } from "../api";
import { createUserMock, fetchUserByIdMock, fetchUsersMock, updateMeMock } from "../fakeServices/user.fakeservice";


export async function fetchUsers(page = 1, limit = 10): Promise<PaginatedResponse<User>> {
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return fetchUsersMock(page, limit);
    }
    const response = await api.get(`/api/users`, { params: { page, limit } });
    return response.data;
}

export async function fetchUserById(id_user: number): Promise<User> {
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return fetchUserByIdMock(id_user);
    }
    const response = await api.get(`/api/users/${id_user}`);
    return response.data;
}

export async function fetchUsersByName(name: string): Promise<User[] | User> {
    const response = await api.get(`/api/users`, {
        params: { name }
    });

    return response.data;
}

export async function createUser(data: CreateUserPayload): Promise<CreateUserResponse>{
    const cleanData = sanitizeData(data);
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return createUserMock(cleanData);
    }
    const response = await api.post(`/api/users`, cleanData);
    return response.data;
}


export async function updateUser(id_user: number, data: UpdateUserPayload): Promise<UpdateUserResponse> {
    const cleanData = sanitizeData(data);
    const response = await api.put(`/api/users/${id_user}`, cleanData);
    return response.data;
}

export async function deleteUser(id_user: number): Promise<DeleteUserResponse> {
    const response = await api.delete(`/api/users/${id_user}`);
    return response.data;
}


// /me para edição permitida do usuario
// email ta aqui pra ajudar o backend a encontrar o usuario certo pra atualizar.
export async function updateMe(data: UpdateMePayload): Promise<UpdateMeResponse> {

    const cleanData = sanitizeData(data);
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return updateMeMock(cleanData);
    }

    const response = await api.put(`/api/users/me`, cleanData);
    return response.data;
}