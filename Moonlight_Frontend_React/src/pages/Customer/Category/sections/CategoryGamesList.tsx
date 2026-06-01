// import { useMemo } from "react";
import { useContext } from "react";
import type { GamePaginatedQueryPayload } from "../../../../@types/game/game.payload";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { GameCard } from "../../../../components/common/Generic/GameCard/GameCard";
import { useCart } from "../../../../hooks/cart/useCart";
import { useFetchPaginatedGames } from "../../../../hooks/fetchItems/store/useFetchPaginatedGames";
import { LibraryContext } from "../../../../hooks/library/useLibrary";

type CategoryGamesListProps = {
    query: GamePaginatedQueryPayload
}

export function CategoryGamesList({query} : CategoryGamesListProps){
    // const query: GamePaginatedQueryPayload = useMemo(() => ({
    //     page: 1,
    //     limit: 8,
    //     random: false,
    //     title: undefined,
    //     category: undefined,
    //     launch_date_from: undefined,
    //     launch_date_to: undefined,
    //     price_min: undefined,
    //     price_max: undefined
    // }), [])

    const {games, hasMore, loadMore} = useFetchPaginatedGames(query);
    const {addItemToCart, removeItemFromCart, items} = useCart();
    const {isOwned} = useContext(LibraryContext);

    return(
        <section>
            <div className="container justify-self-center w-full animate-fade-in">
                <div className="mb-5">
                    <h1 className="text-2xl text-center">Jogos da Categoria de...:</h1>
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