import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Button } from "../../../../common/Generic/Button/Button";
import { InputBar } from "../../../../common/Generic/InputBar";


type SearchInputHeaderProps = {
    name?: string
    placeholder?: string
}

export function SearchInputHeader({name = "game", placeholder = "Pesquisar algum jogo..."} : SearchInputHeaderProps) {
    

    return (
        <div className={`justify-self-center max-w-250 border-2 border-white rounded-md focus-within:border-blue-400 bg-night flex items-center w-full overflow-hidden transition-all duration-200 active:scale-[0.99]`}>
            <div className="w-12"/>
            <InputBar className={`text-center flex-1 bg-transparent outline-none border-none text-white placeholder:text-gray-400`} name={name} placeholder={placeholder} maxLength={50} type="text" variant="secondary"/>
            <Button className="w-12 rounded-none hover:bg-blue-300 active:bg-blue-400" type="submit" variant="cta" name={name} icon={<MagnifyingGlassIcon className="justify-self-center active:scale-80 transition-all duration-200" size={32} weight="thin"/>}></Button>
        </div>
    )
}
