import { Button } from "../../../../components/common/Generic/Button/Button";
import { Carrousel } from "../../../../components/common/Generic/Carrousel";
import { CategoryCard } from "../../../../components/common/Generic/CategoryCard/CategoryCard";
import { CategoryCardSkeleton } from "../../../../components/common/Generic/CategoryCard/CategoryCardSkeleton";
import { useBreakpoint } from "../../../../hooks/breakpoints/useBreakpoint";
import { useFetchCategories } from "../../../../hooks/fetchItems/useFetchCategories";

export function CarrouselCardSection(){
    const { isMobile, isTablet } = useBreakpoint();
    const cardsPerView = isMobile ? 1 : isTablet ? 3 : 6; // o ultimo caso é desktop;
    const {categories, isLoading} = useFetchCategories();

    return(
        <section className="flex flex-col p-8 gap-8 justify-center items-center">
            <h1 className="text-2xl text-center">Categorias de Jogos a Explorar:</h1>
            <div className="max-lg:w-[70vw] lg:w-[85vw] justify-self-center">
                <Carrousel cardsPerView={cardsPerView}>
                    {isLoading //está carregando? se sim placeholder carregando
                        ? Array.from({ length: cardsPerView }).map((_, i) => (<CategoryCardSkeleton key={i} />)) 
                        : (categories.map(category => ( //carregou? então componente real
                            <Button as="link" href={"/"+ category.id_category} variant="primary">
                                <CategoryCard 
                                    key={category.id_category} 
                                    category={category}
                                />
                            </Button>
                    )))}
                </Carrousel>  
            </div>
        </section>
        
        
    )
}