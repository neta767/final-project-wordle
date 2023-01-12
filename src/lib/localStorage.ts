import {CharStatus} from "./server-requests";

type StoredGameState = {
    guesses: string[];
    gameStatus: 'won' | 'lost' | 'else';
    hashSolution: string;
    charStatuses: { [key: string]: CharStatus };
    guessStatuses: CharStatus[];
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
    localStorage.setItem('gameState', JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
    const state = localStorage.getItem('gameState');
    return state ? (JSON.parse(state) as StoredGameState) : null;
}