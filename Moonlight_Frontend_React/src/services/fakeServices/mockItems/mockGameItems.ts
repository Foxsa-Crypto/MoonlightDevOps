import type { GameWithCategories } from "../../../@types";

export const mockGameItems: GameWithCategories[] = [
    {
        id_game: 1,
        title: "Elden Ring",
        price: 249.90,
        launch_date: new Date("2022-02-25"),
        active: true,
        stock_available: 10,
        image: "https://picsum.photos/300/200?random=1",
        categories: [
            { id_category: 1, name: "RPG", description: "Jogos de interpretação de papéis." },
            { id_category: 4, name: "Ação e Aventura", description: "Muita movimentação e história." }
        ]
    },
    {
        id_game: 2,
        title: "Counter-Strike 2",
        price: 0,
        launch_date: new Date("2023-09-27"),
        active: true,
        stock_available: 999,
        image: "https://picsum.photos/300/200?random=2",
        categories: [
            { id_category: 2, name: "FPS", description: "Tiro em primeira pessoa." }
        ]
    },
    {
        id_game: 3,
        title: "Forza Horizon 5",
        price: 249.00,
        launch_date: new Date("2021-11-09"),
        active: true,
        stock_available: 5,
        image: "https://picsum.photos/300/200?random=3",
        categories: [
            { id_category: 3, name: "Corrida", description: "Velocidade e simuladores." }
        ]
    },
    {
        id_game: 4,
        title: "Stardew Valley",
        price: 24.99,
        launch_date: new Date("2016-02-26"),
        active: true,
        stock_available: 50,
        image: "https://picsum.photos/300/200?random=4",
        categories: [
            { id_category: 1, name: "RPG", description: "Jogos de interpretação de papéis." },
            { id_category: 5, name: "Indie", description: "Desenvolvido por estúdios independentes." }
        ]
    },
    {
        id_game: 5,
        title: "Cyberpunk 2077",
        price: 199.90,
        launch_date: new Date("2020-12-10"),
        active: true,
        stock_available: 0, // Teste de produto esgotado
        image: "https://picsum.photos/300/200?random=5",
        categories: [
            { id_category: 1, name: "RPG", description: "Jogos de interpretação de papéis." },
            { id_category: 2, name: "FPS", description: "Tiro em primeira pessoa." },
            { id_category: 4, name: "Ação e Aventura", description: "Muita movimentação e história." }
        ]
    },
    {
        id_game: 6,
        title: "Hollow Knight",
        price: 27.99,
        launch_date: new Date("2017-02-24"),
        active: false, // Teste de produto inativo (não deve aparecer na loja)
        stock_available: 20,
        image: "https://picsum.photos/300/200?random=6",
        categories: [
            { id_category: 4, name: "Ação e Aventura", description: "Muita movimentação e história." },
            { id_category: 5, name: "Indie", description: "Desenvolvido por estúdios independentes." }
        ]
    }
];