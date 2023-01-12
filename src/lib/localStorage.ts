import {CharStatus} from "./server-requests";

type StoredGameState = {
    guesses: string[];
    hashSolution: string;
    charStatuses: { [key: string]: CharStatus };
    guessesStatuses: CharStatus[][];
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
    localStorage.setItem('gameState', JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
    const state = localStorage.getItem('gameState');
    return state ? (JSON.parse(state) as StoredGameState) : null;
}