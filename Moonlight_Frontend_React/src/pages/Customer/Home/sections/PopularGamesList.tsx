import { useContext, useMemo } from "react";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { GameCard } from "../../../../components/common/Generic/GameCard/GameCard";
import { useCart } from "../../../../hooks/cart/useCart";
import { useFetchPaginatedGames } from "../../../../hooks/fetchItems/store/useFetchPaginatedGames";
import { LibraryContext } from "../../../../hooks/library/useLibrary";
import { getRandomSeed } from "../../../../utils/getRandomSeed";
import type { GamePaginatedQueryPayload } from "../../../../@types/game/game.payload";

export function PopularGamesList(){
    const query: GamePaginatedQueryPayload = useMemo(() => ({
        page: 1,
        limit: 8,
        random: true,
        random_seed: getRandomSeed(),
        title: undefined,
        category: undefined,
        launch_date_from: undefined,
        launch_date_to: undefined,
        price_min: undefined,
        price_max: undefined
    }), [])

    const {games, hasMore, loadMore} = useFetchPaginatedGames(query);
    const {addItemToCart, removeItemFromCart, items} = useCart();
    const { isOwned } = useContext(LibraryContext);

    return(
        <section className="pt-8 w-full bg-gradient-to-b from-night-soft via-night-soft to-night">
            <div className="container justify-self-center w-full animate-fade-in">
                <div className="mb-5">
                    <h1 className="text-2xl">Jogos em Destaque:</h1>
                    <span>Os títulos mais populares</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {games?.map(game => {
                        const alreadyInCart = items.some(cartItem => cartItem.id_game === game.id_game);
                        const cartItem = { id_game: game.id_game!, title: game.title, price: game.price, image: game.image, categories: game.categories}
                        

                        return(
                            <GameCard 
                                game={game}
                                onCart={() => alreadyInCart 
                                    ? removeItemFromCart(game.id_game!) 
                                    : addItemToCart(cartItem)
                                }
                                onBuy={() => addItemToCart(cartItem, "cart")}
                                gamePage={`/games/${game.id_game}`}
                                isAlreadyInCart={alreadyInCart}
                                key={game.id_game}
                                isOwned={isOwned(game.id_game!)} 
                                actions={isOwned(game.id_game!) ? (
                                    <Button variant="cta" className="rounded-md p-2 w-full animate-glow-cta" onClick={() => window.open(game.link)}>
                                        Baixar
                                    </Button>
                                ) : undefined}
                            /> 
                        ) 
                    })}
                </div>
                <div className="p-8 w-full">
                    {hasMore 
                    ? (
                        <Button variant="secondary" className="p-4 rounded-md flex justify-self-center" onClick={() => loadMore()}>
                            Ver mais
                        </Button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </section>
    )
}