import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Button } from "./Button/Button";
import { InputBar } from "./InputBar";

type SearchInputBarProps = {
  name?: string;
  classNameDiv?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
};

export function SearchInputBar({
  name = "game",
  classNameDiv = "",
  placeholder = "Pesquisar algum jogo...",
  value = "",
  onChange,
  onSearch,
}: SearchInputBarProps) {
  function handleSearch() {
    const valueTrimmed = value.trim();
    onSearch?.(valueTrimmed); // leva o valor limpo para a pagina.
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div
      className={`${classNameDiv} justify-self-center border-2 border-white rounded-md focus-within:border-blue-400 bg-night flex items-center w-full overflow-hidden transition-all duration-200 active:scale-[0.99]`}
    >
      <div className="w-12" />
      <InputBar
        className={`text-center flex-1 bg-transparent outline-none border-none text-white placeholder:text-gray-400`}
        name={name}
        placeholder={placeholder}
        type="text"
        variant="secondary"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        className="w-12 rounded-none hover:bg-blue-300 active:bg-blue-400"
        type="submit"
        variant="cta"
        name={name}
        onClick={handleSearch}
        icon={
          <MagnifyingGlassIcon
            className="justify-self-center active:scale-80 transition-all duration-200"
            size={32}
            weight="thin"
          />
        }
      ></Button>
    </div>
  );
}
