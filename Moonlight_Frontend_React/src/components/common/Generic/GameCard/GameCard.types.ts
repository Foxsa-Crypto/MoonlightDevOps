import type { Game } from "../../../../@types/Game";

export type GameCardProps = {
  game: Game;
  onAddToCart?: () => void
  onBuy?: () => void
  actions?: React.ReactNode
}