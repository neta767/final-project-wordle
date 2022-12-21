export type StoredGameState = {
    guesses: string[]
    solution: string
}


export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
    localStorage.setItem('gameState', JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
    const state = localStorage.getItem('gameState')
    return state ? (JSON.parse(state) as StoredGameState) : null
}

export const getUserName = () => {
    const userName = localStorage.getItem('userName')
    if (userName === null) {
        return ''
    }
    return userName
}

export const getIsLogin = () => {
    return localStorage.getItem('userName') !== null
}
