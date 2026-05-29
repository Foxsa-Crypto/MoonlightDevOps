import type { Category } from "../../../../@types/Category";
import { Card } from "../Card";

type CategoryCardProps = {
    category: Category
}

export function CategoryCard({category} : CategoryCardProps) {

  return (
    <Card variant="container" className="w-full relative overflow-hidden group">
      <img
        src={category.image}
        className="h-64 w-full object-cover object-center rounded-md grayscale
         group-hover:scale-105 group-hover:grayscale-0 group-hover:-translate-y-1 transition-all duration-300"
      />

      <div className="absolute inset-0 transition-all duration-300 flex items-center justify-center rounded-md">
        <p className="text-white bg-night-soft font-bold text-xl group-hover:-translate-y-1 transition-all duration-300 rounded-md p-2">
          {category.name}
        </p>
      </div>
    </Card>
  );
}
