import { ShoppingCartIcon } from "@phosphor-icons/react";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { Collapse } from "../../../../components/common/Generic/Collapse";

export function GameDetail(){
    return(
        <article className="w-full relative my-10 overflow-hidden"> {/* detalhes sobre o game */}
            <header className="lg:text-left lg:p-2 lg:pl-20 max-lg:text-center">
            {/* titulo do game */}
                <h1 className="pb-4 relative text-3xl justify-baseline fx-underline-to-left">Carlinhos the Game</h1>
            </header>
            <div className="flex max-lg:pt-4 max-lg:flex-col max-lg:w-full max-lg:flex-wrap lg:flex-row lg:flex-nowrap lg:p-2 lg:pl-20 lg:pb-4 lg:gap-18">
            {/* imagem do game, preço, botões e tipo do game */}
                <section className="lg:w-1/2">
                    <img 
                        className="w-fit max-lg:justify-self-center max-lg:w-[75vw]" 
                        src="https://picsum.photos/1920/1080" 
                        alt="Lorem the ipsum the game" 
                    />
                </section>
                <section className="flex flex-col justify-center flex-wrap max-lg:text-center max-lg:items-center max-lg:p-12 lg:items-start lg:w-1/2 lg:text-left lg:p-0">
                    <p className="flex flex-col gap-1 max-lg:text-2xl lg:text-4xl mb-4">
                        R$ 10,00
                    </p>
                    <Button
                        variant="cta"
                        className="block rounded-md p-2 w-fit animate-glow-cta mb-2"
                    >
                        Comprar agora
                    </Button>
                    <Button
                        variant="primary"
                        className="flex gap-2 content-center text-center items-center border-0 rounded-md p-2 mb-2"
                    >
                        <ShoppingCartIcon size={18}/> Adicionar ao Carrinho
                    </Button>
                    <p className="text-white">Ação</p>
                </section>
            </div>
            <Collapse label="Ver descrição do jogo aqui">
                <div className="container text-left">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam unde libero animi fuga asperiores expedita cupiditate! Earum nemo voluptatibus odio sint! Cum consequatur consequuntur quasi. Quam dignissimos modi corrupti optio!</p>
                </div>
                <h2 className="container text-2xl">Categorias:</h2>
                <div className="container text-left">
                    <p>Ação, Aventura e etc</p>
                </div>
            </Collapse>
        </article>
    )
}