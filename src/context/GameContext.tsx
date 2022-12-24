import {AlertContext, useAlert} from "./AlertContext";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {loadGameStateFromLocalStorage, saveGameStateToLocalStorage} from "../lib/localStorage";
import {isWinningWord, solution} from "../lib/words";
import {MAX_CHALLENGES, REVEAL_TIME_MS} from "../constants/settings";

type GameContextValue = {
    guesses: string[]
    currentGuess: string
    isRevealing: boolean
    onChar: (value: string) => void
    onDelete: () => void
    isInfoModalOpen: boolean,
    handleClose: () => void
}

export const GameContext = createContext<GameContextValue | null>({
    guesses: [],
    currentGuess: '',
    isRevealing: false,
    onChar: () => null,
    onDelete: () => null,
    isInfoModalOpen: false,
    handleClose: () => null
})

export const useGame = () => useContext(GameContext) as GameContextValue

type Props = {
    children?: ReactNode
}


export const GameProvider = ({children}: Props) => {

    const {showError: showErrorAlert, showSuccess: showSuccessAlert} =
        useAlert()
    const [currentGuess, setCurrentGuess] = useState('')
    const [isGameWon, setIsGameWon] = useState(false)
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
    const [isGameLost, setIsGameLost] = useState(false)
    const [isRevealing, setIsRevealing] = useState(false)
    const [guesses, setGuesses] = useState<string[]>(() => {
        const loaded = loadGameStateFromLocalStorage()
        if (!loaded) {
            return []
        }
        const gameWasWon = loaded.guesses.includes(solution)
        if (gameWasWon) {
            setIsGameWon(true)
            showSuccessAlert()
        } else if (loaded.guesses.length === MAX_CHALLENGES) {
            setIsGameLost(true)
            showErrorAlert()
        }
        return loaded.guesses
    })

    useEffect(() => {
        // if no game state on load,
        // show the user the how-to info modal
        if (!loadGameStateFromLocalStorage()) {
            setTimeout(() => {
                setIsInfoModalOpen(true)
            }, REVEAL_TIME_MS)
        }
    })

    useEffect(() => {
        saveGameStateToLocalStorage({guesses, solution})
    }, [guesses])

    useEffect(() => {
        if (isGameWon || isGameLost) {

            return
        }

        if (currentGuess.length === solution.length) {
            console.log('Done')

            setIsRevealing(true)
            // turn this back off after all
            // chars have been revealed
            setTimeout(() => {
                setIsRevealing(false)
            }, REVEAL_TIME_MS * solution.length)

            const winningWord = isWinningWord(currentGuess)

            if (
                //?
                guesses.length < MAX_CHALLENGES &&
                !isGameWon
            ) {
                setGuesses([...guesses, currentGuess])
                setCurrentGuess('')

                if (winningWord) {
                    return setIsGameWon(true)
                } else if (guesses.length === MAX_CHALLENGES - 1) {
                    setIsGameLost(true)
                }
            }
        }
    }, [currentGuess])

    useEffect(() => {
        if (isGameWon) {
            showSuccessAlert()
        }

        if (isGameLost) {
            showErrorAlert()
        }
    }, [isGameWon, isGameLost, showSuccessAlert, showErrorAlert])

    const onChar = (value: string) => {
        if (
            (currentGuess + value).length <= solution.length &&
            guesses.length < MAX_CHALLENGES &&
            !isGameWon
        ) {
            setCurrentGuess(currentGuess + value)
        }
    }

    const onDelete = () => {
        setCurrentGuess(currentGuess.split('').slice(0, -1).join(''))
    }

    const handleClose = () => {
        setIsInfoModalOpen(false)
    }
    return (
        <GameContext.Provider
            value={{
                guesses,
                currentGuess,
                isRevealing,
                onChar,
                onDelete,
                isInfoModalOpen,
                handleClose
            }}
        >
            {children}
        </GameContext.Provider>
    )
}
