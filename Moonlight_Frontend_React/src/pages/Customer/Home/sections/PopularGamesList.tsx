
export function PopularGamesList(){
    // const [jogos, setJogos] = useState([]);
    // const [page, setPage] = useState(1);
    // const [temMais, setTemMais] = useState(true);

    // async function carregarMais() {
    //     const res = await api.get(`/games?page=${page}&limit=6`);
        
    //     setJogos(prev => [...prev, ...res.data.games]); // adiciona sem repetir
    //     setPage(prev => prev + 1);
        
    //     if (res.data.games.length < 6) setTemMais(false); // sem mais páginas
    // }

    // useEffect(() => {
    //     carregarMais(); // carrega primeira página
    // }, []);

    return(
        <section className="container">
            <div>
                <div>
                    <h1 className="text-2xl">Jogos em Destaque:</h1>
                    <span>Os títulos mais populares</span>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {/* adicionar map de jogos aqui */}
                    {/* {jogos.map(jogo => <GameCard key={jogo.id} {...jogo} />)} */}
                </div>
                {/* {temMais && (
                    <button onClick={carregarMais}>
                        Ver mais
                    </button>
                )} */}
            </div>
        </section>
    )
}