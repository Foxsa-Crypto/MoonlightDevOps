import { CaretDownIcon, ListIcon, MagnifyingGlassIcon, ShoppingCartSimpleIcon, XIcon } from "@phosphor-icons/react";
import { Button } from "../../../common/Generic/Button/Button";
import { useState } from "react";
import { useBreakpoint } from "../../../../hooks/breakpoints/useBreakpoint";
import { getAnimationState } from "../../../../utils/ui/animation/animationState";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { HeaderProfileDropdown } from "./components/HeaderProfileDropdown";
import { Dropdown } from "../../../common/Generic/Dropdown";
import { useFetchCategories } from "../../../../hooks/fetchItems/useFetchCategories";
import { SearchInputCompact } from "./components/SearchInputCompact";
import { SearchInputHeader } from "./components/SearchInputHeader";

export function CustomerHeader(){
    const [hamburguerIsOpen, setHamburguerIsOpen] = useState(false); //como está false, ao fazer !hamburguerisOpen é true.
    const [searchIsClicked, setSearchIsClicked] = useState(false);
    const {isMobile, isTablet} = useBreakpoint();
    const animIsSearchClicked = getAnimationState(searchIsClicked);
    const animIsHamburguerOpen = getAnimationState(hamburguerIsOpen);
    const {isAuthenticated} = useAuth();
    const {categories} = useFetchCategories();

    /* o header é 120px */

    // const stringCenterEffect = "relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:after:left-0";

    return(
        <header className="fixed top-0 left-0 relative bg-night w-full flex z-11">

                <Button className="justify-items-center w-1/2 pl-5 lg:pl-0 lg:w-1/3" as="link" href="/" variant="transparent">
                    <img src="/src/assets/MoonlightMenor.png" className="h-auto w-auto" alt="Moonlight Logo" />
                </Button>

                <Button 
                    className="w-1/2 justify-items-end pr-5 lg:hidden"
                    onClick={() => setHamburguerIsOpen(!hamburguerIsOpen)}
                >
                    <div className="relative w-7 h-7">
                        <ListIcon
                            size={28}
                            className={`
                            absolute transition-all duration-300
                            ${animIsHamburguerOpen.styles.fadeOutOpacity} ${animIsHamburguerOpen.styles.rotate} ${animIsHamburguerOpen.styles.scaleLess}
                            `}
                        />

                        <XIcon
                            size={28}
                            className={`
                            absolute transition-all duration-300
                            ${animIsHamburguerOpen.styles.fadeInOpacity} ${animIsHamburguerOpen.styles.scaleMore}
                            `}
                        />
                    </div>
                </Button> 

                <nav className={`${hamburguerIsOpen && isTablet || hamburguerIsOpen && isMobile ? "block" : "hidden"} bg-night absolute top-full left-0 w-full
           flex-col items-center lg:flex lg:w-2/3 lg:bg-transparent lg:static lg:flex-row`}>
                    <div className="flex w-full justify-center flex-col text-center lg:flex-row lg:static lg:w-1/2 lg:gap-6.25">
                        {isTablet || isMobile ? <SearchInputCompact/> : ""}
                        <Button 
                          className="max-lg:active:bg-white max-lg:active:text-night max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent fx-underline" 
                          as="link" 
                          href="/" 
                          variant="transparent">
                            Home
                        </Button>
                        <Button 
                          className="max-lg:active:bg-white max-lg:active:text-night max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent fx-underline" 
                          as="link" 
                          href="/offers" 
                          variant="transparent">
                            Ofertas
                        </Button>
                        <Dropdown alignment="middle"
                            trigger={(open) =>(
                                <Button 
                                    className="max-lg:justify-self-center max-lg:active:bg-white max-lg:active:text-night max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent fx-underline flex items-center" 
                                    as="button"
                                    variant="transparent">
                                        Categorias
                                    <CaretDownIcon size={20} className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} />
                                </Button>  
                            )}
                        >
                            {(categories.map(category => ( //carregou? então categorias reais aqui
                                    <Button key={category.id_category} as="link" variant="transparent" href={"/"+ category.id_category} className={`max-lg:active:bg-white max-lg:active:text-night lg:hover:bg-white lg:hover:text-night transition-all duration-300 w-full block px-4 py-2 text-sm`}>
                                        {category.name}
                                    </Button>
                            )))}
                        </Dropdown>
                        <Button 
                          className="max-lg:active:bg-white max-lg:active:text-night max-lg:active:scale-95 duration-300 transition-all hover:bg-transparent fx-underline" 
                          as="link" 
                          href="/news" 
                          variant="transparent">
                            Novidades
                        </Button>
                    </div>
                    <div className="flex w-full flex-col justify-center text-center items-center lg:flex-row lg:static lg:w-1/2 lg:gap-6.25 ">
                        {isTablet || isMobile 
                            ? "" 
                            : <Button 
                                className="max-lg:active:bg-white max-lg:active:text-night max-lg:active:scale-95 max-lg-hover:translate-y-0 transition-all duration-300 hover:-translate-y-2"
                                onClick={() => setSearchIsClicked(!searchIsClicked)} 
                                variant="transparent" 
                                icon={<MagnifyingGlassIcon size={32} weight={searchIsClicked ? "fill" : "thin"} className={`transition-transform duration-600 ${animIsSearchClicked.styles.rotate}`} />}>
                              </Button>
                        }
                        <Button 
                          className="max-lg:active:bg-white max-lg:active:text-night max-lg:active:scale-95 max-lg:hover:translate-y-0 lg:block lg:w-fit w-full transition-all duration-300 hover:-translate-y-2 flex justify-center gap-1.5 items-center flex-row" 
                          as="link" 
                          href="/" 
                          variant="transparent" 
                          icon={<ShoppingCartSimpleIcon size={32} weight="thin" />}>
                              {isTablet || isMobile ? "Carrinho" : ""}
                        </Button>
                        {!isAuthenticated 
                            ?   <Button 
                                    className="max-lg:active:bg-white max-lg:active:text-night max-lg:active:scale-95 max-lg:hover:translate-y-0 lg:rounded-md lg:p-2 lg:block lg:w-fit w-full transition-all duration-300 hover:bg-blue-600 flex justify-center items-center flex-row" 
                                    as="link" 
                                    href="/login" 
                                    variant="cta" 
                                >
                                    Fazer Login
                                </Button>
                            :   <HeaderProfileDropdown/>
                        }
                    </div>
                </nav>

                <div 
                    className={
                        `bg-night-soft absolute flex gap-5 justify-center left-0 top-30 p-8 w-full z-11 transition-all duration-300 ease-out
                        ${animIsSearchClicked.styles.fadeInOpacity} ${animIsSearchClicked.styles.slideDown} ${animIsSearchClicked.styles.pointer}`
                    }>
                    <Button 
                      className="bg-transparent" 
                      as="button" 
                      onClick={() => setSearchIsClicked(!searchIsClicked)} 
                      variant="transparent" 
                      icon={<XIcon size={32} weight="thin" />}>
                    </Button>
                    <SearchInputHeader/>
                </div>

        </header>    
    )
}