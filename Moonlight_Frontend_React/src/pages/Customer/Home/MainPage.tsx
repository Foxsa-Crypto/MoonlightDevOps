import { CarrouselCardSection } from "./sections/CarrouselCardSection";
import { HeroSection } from "./sections/HeroSection";
import { PopularGamesList } from "./sections/PopularGamesList";

function MainPage() {

  return (
    <main className="bg-gradient-to-b from-night-soft via-night to-night flex flex-col items-center justify-center">
      <HeroSection 
        id_game={1}
        gameTitle="Carlinhos the Game"
        gameDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, autem tempore numquam est esse hic cum neque saepe itaque libero quos, fugit, nemo mollitia. Atque accusamus corporis cum voluptatem omnis."
        imageDescription="Lorem the ipsum the game"
        imageVariable={`https://picsum.photos/1920/1080`}
      />
      <CarrouselCardSection/>
      <PopularGamesList/>
    </main>
  )
}


export default MainPage;