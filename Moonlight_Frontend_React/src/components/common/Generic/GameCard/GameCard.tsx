import { Button } from "../Button/Button";
import { Card, CardContent, CardHeader } from "../Card";
import type { GameCardProps } from "./GameCard.types";

export function GameCard({game, onAddToCart, onBuy, actions} : GameCardProps) {

  const renderDefaultActions = (
    <>
      {onBuy && (
        <Button variant="primary" onClick={onBuy}>
          Comprar
        </Button>
      )}
      {onAddToCart && (
        <Button variant="primary" onClick={onAddToCart}>
          Carrinho
        </Button>
      )}
    </>
  )

  return (
    <Card>
      <CardHeader>
        <img src={game.image} className="h-64 w-full object-cover rounded-md" />
      </CardHeader>
      <CardContent>
      <h3>{game.title}</h3>
      <p>Preço: R$ {game.price}</p>
      <div className="flex gap-2 mt-2">
        {actions ?? renderDefaultActions}
      </div>
      </CardContent>
      
    </Card>
  );
}
