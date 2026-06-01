import { useContext, useMemo } from "react";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { GameCard } from "../../../../components/common/Generic/GameCard/GameCard";
import { useCart } from "../../../../hooks/cart/useCart";
import { useFetchPaginatedGames } from "../../../../hooks/fetchItems/store/useFetchPaginatedGames";
import { LibraryContext } from "../../../../hooks/library/useLibrary";
import { getRandomSeed } from "../../../../utils/getRandomSeed";
import type { GamePaginatedQueryPayload } from "../../../../@types/game/game.payload";

type CatalogGamesListProps = {
  title?: string;
  category?: string;
  launch_date_from?: string;
  launch_date_to?: string;
  price_min?: number;
  price_max?: number;
};

export function CatalogGamesList(props: CatalogGamesListProps) {
  const query: GamePaginatedQueryPayload = useMemo(
    () => ({
      page: 1,
      limit: 8,
      random: false,
      random_seed: getRandomSeed(),
      title: props.title,
      category: props.category,
      launch_date_from: props.launch_date_from,
      launch_date_to: props.launch_date_to,
      price_min: props.price_min,
      price_max: props.price_max,
    }),
    [props],
  );

  const { games, hasMore, loadMore } = useFetchPaginatedGames(query);
  const { addItemToCart, removeItemFromCart, items } = useCart();
  const { isOwned } = useContext(LibraryContext);

  return (
    <section className="px-4 pt-8 w-full">
      <div className="container justify-self-center w-full animate-fade-in">
        <div className="mb-5">
          <h1 className="text-2xl">Resultado da Pesquisa:</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {games?.map((game) => {
            const alreadyInCart = items.some(
              (cartItem) => cartItem.id_game === game.id_game,
            );
            const cartItem = {
              id_game: game.id_game!,
              title: game.title,
              price: game.price,
              image: game.image,
              categories: game.categories,
            };

            return (
              <GameCard
                game={game}
                onCart={() =>
                  alreadyInCart
                    ? removeItemFromCart(game.id_game!)
                    : addItemToCart(cartItem)
                }
                onBuy={() => addItemToCart(cartItem, "cart")}
                gamePage={`/games/${game.id_game}`}
                isAlreadyInCart={alreadyInCart}
                key={game.id_game}
                isOwned={isOwned(game.id_game!)}
                actions={
                  isOwned(game.id_game!) ? (
                    <Button
                      variant="cta"
                      className="rounded-md p-2 w-full animate-glow-cta"
                      onClick={() => window.open(game.link)}
                    >
                      Baixar
                    </Button>
                  ) : undefined
                }
              />
            );
          })}
        </div>
        <div className="p-8 w-full">
          {hasMore ? (
            <Button
              variant="secondary"
              className="p-4 rounded-md flex justify-self-center"
              onClick={() => loadMore()}
            >
              Ver mais
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}
