import { StatusCard } from "./sections/StatusCard";

export function AdminMainPage() {
    return(
        <main className="pt-10 min-h-screen bg-gradient-to-b from-night-soft via-night to-night">
            <header className="mb-10 justify-self-center w-fit bg-white/5 text-white rounded-xl p-4 border border-white/8 backdrop-blur-sm">
                <h1 className="text-2xl text-center ">Dashboard</h1>
            </header>

            <div className="grid grid-cols-3 gap-4 container justify-self-center">

                <StatusCard headerFeatures={"Jogos"} contentFeatures={""}/>
                <StatusCard headerFeatures={"Usuarios"} contentFeatures={""}/>
                <StatusCard headerFeatures={"Categorias"} contentFeatures={""}/>
            </div>
        </main>
    )
}