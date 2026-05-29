import type { Category } from "../../@types/Category";
import { mockCategoryItems } from "./mockItems/mockCategoryItems";

export async function fetchCategoryMock(): Promise<Category[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCategoryItems;
}

export async function fetchCategoryByIdMock(id: number): Promise<Category | Error> {
  await new Promise(resolve => setTimeout(resolve, 500));

    const category = mockCategoryItems.find(cat => cat.id_category === id);

    if(!category){
      throw new Error("Categoria não encontrada");
    }

    return category;
}