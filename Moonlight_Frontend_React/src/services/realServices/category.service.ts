import type { Category } from "../../@types/Category";
import { sanitizeData } from "../../utils/sanitizer/sanitizer";
import { api } from "../api";
import { fetchCategoryByIdMock, fetchCategoryMock } from "../fakeServices/category.fakeservice";

export async function fetchCategories(): Promise<Category[]> {
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return fetchCategoryMock();
    }

    const response = await api.get(`/api/categories`);
    return response.data;
}

export async function fetchCategoryById(id_category: number): Promise<Category | Error> {
    if (import.meta.env.VITE_USE_MOCK === "true") {
        return fetchCategoryByIdMock(id_category);
    }

    const response = await api.get(`/api/categories/${id_category}`);
    return response.data;
}

export async function fetchCategoriesByName(name: string): Promise<Category | Error> {
    const response = await api.get(`/api/categories`, {
        params: { name }
    });

    return response.data;
}

export async function createCategory(data: {name: string, description: string, image: string}) {
    const cleanData = sanitizeData(data);
    const response = await api.post(`/api/categories`, cleanData);
    return response.data;
}

export async function updateCategory(id_category: number, data: {name: string, description: string, image: string}) {
    const cleanData = sanitizeData(data);
    const response = await api.put(`/api/categories/${id_category}`, cleanData);
    return response.data;
}

export async function deleteCategory(id_category: number) {
    const response = await api.delete(`/api/categories/${id_category}`);
    return response.data;
}