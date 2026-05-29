import { GameDetail } from "./sections/GameDetail";


function GamePage() {

  return (
    <main className="bg-gradient-to-b from-night-soft via-night to-night flex flex-col items-center justify-center">
      <GameDetail/>
    </main>
  )
}

// ideia colocar uma sessão de carrousel de game card em baixo, para mostrar mais jogos que os usuarios gostam. 


export default GamePage;