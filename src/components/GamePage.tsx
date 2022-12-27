import {useEffect, useState} from 'react'

import {MAX_CHALLENGES, REVEAL_TIME_MS} from '../constants/settings'
import {
    CORRECT_WORD_MESSAGE,
    WIN_MESSAGES,
} from '../constants/strings'
import {useAlert} from '../context/AlertContext'
import {
    loadGameStateFromLocalStorage,
    saveGameStateToLocalStorage
} from '../lib/localStorage'
import {isWinningWord, solution} from '../lib/words'
import {Grid} from './grid/Grid'
import {Keyboard} from './keyboard/Keyboard'
import {InfoModal} from "../components/modals/InfoModal";
import {AlertContainer} from "../components/alerts/AlertContainer";

function GamePage() {
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
            const winMessage =
                WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
            showSuccessAlert(winMessage)
        } else if (loaded.guesses.length === MAX_CHALLENGES) {
            setIsGameLost(true)
            showErrorAlert(CORRECT_WORD_MESSAGE(solution))
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
            const winMessage =
                WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
            showSuccessAlert(winMessage)
        }

        if (isGameLost) {
            showErrorAlert(CORRECT_WORD_MESSAGE(solution))
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

    return (
        <div
            className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
            <div className="flex grow flex-col justify-center pb-6 short:pb-2">
                <Grid
                    solution={solution}
                    guesses={guesses}
                    currentGuess={currentGuess}
                    isRevealing={isRevealing}
                />
            </div>
            <Keyboard
                onChar={onChar}
                onDelete={onDelete}
                guesses={guesses}
                isRevealing={isRevealing}
            />
            <InfoModal
                isOpen={isInfoModalOpen}
                handleClose={() => setIsInfoModalOpen(false)}
            />
            <AlertContainer/>
        </div>
    )
}

export default GamePage
