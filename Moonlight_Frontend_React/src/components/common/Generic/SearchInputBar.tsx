import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Button } from "./Button/Button";
import { InputBar } from "./InputBar";

type SearchInputBarProps = {
    variant: "border-radius" | "borderless"
    name?: string
    className?: string
    placeholder?: string
    classNameInput?: string
}

export function SearchInputBar({variant = "borderless", name = "game", className = "", placeholder = "Pesquisar algum jogo...", classNameInput = ""} : SearchInputBarProps) {

    const variantClass = {
        "border-radius": `border-2 border-white rounded-md focus-within:border-blue-400 ${className}`,
        "borderless": `${className}`
    };
    
    const classPattern = variantClass[variant];

    return (
        <div className={`${classPattern} bg-night flex items-center w-full overflow-hidden transition-all duration-200 active:scale-[0.99]`}>
            <div className="w-12"/>
            <InputBar className={`${classNameInput} text-center flex-1 bg-transparent outline-none border-none text-white placeholder:text-gray-400`} name={name} placeholder={placeholder} type="text" variant="secondary"/>
            <Button className="w-12 rounded-none hover:bg-blue-300 active:bg-blue-400" type="submit" variant="cta" name={name} icon={<MagnifyingGlassIcon className="justify-self-center active:scale-80 transition-all duration-200" size={32} weight="thin"/>}></Button>
        </div>
    )
}
