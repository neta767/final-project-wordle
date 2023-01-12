import {useEffect, useState} from 'react'

import {MAX_CHALLENGES, REVEAL_TIME_MS, SOLUTION_LENGTH} from '../constants/settings'
import {
    CORRECT_WORD_MESSAGE,
    WIN_MESSAGES,
} from '../constants/strings'
import {useAlert} from '../context/AlertContext'
import {
    loadGameStateFromLocalStorage,
    saveGameStateToLocalStorage
} from '../lib/localStorage'
import {Grid} from './grid/Grid'
import {Keyboard} from './keyboard/Keyboard'
import {InfoModal} from "./modals/InfoModal";
import {AlertContainer} from "./alerts/AlertContainer";
import {CharStatus, gameReq, getHashSolution, UpdateGameStatus} from "../lib/server-requests";

function GamePage() {
    const {showError: showErrorAlert, showSuccess: showSuccessAlert} =
        useAlert()
    const [hashSolution, setHashSolution] = useState('')
    const [currentGuess, setCurrentGuess] = useState('')
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
    const [isRevealing, setIsRevealing] = useState(false)
    const [charStatuses, setCharStatuses] = useState<{ [key: string]: CharStatus }>(() => {
        const loaded = loadGameStateFromLocalStorage()
        if (!loaded) {
            return {}
        }
        return loaded.charStatuses
    })
    const [guessStatuses, setGuessStatuses] = useState<CharStatus[]>(() => {
        const loaded = loadGameStateFromLocalStorage()
        if (!loaded) {
            return []
        }
        return loaded.guessStatuses
    })
    const [gameStatus, setGameStatus] = useState<'won' | 'lost' | 'else'>(() => {
        const loaded = loadGameStateFromLocalStorage()
        if (!loaded) {
            return 'else'
        }
        if ('won' === loaded.gameStatus) {
            showSuccessAlert(WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)])
            return 'won'
        } else if ('lost' === loaded.gameStatus) {
            showErrorAlert(CORRECT_WORD_MESSAGE('solution'))
            return 'lost'
        }
        return 'else'
    })
    const [guesses, setGuesses] = useState<string[]>(() => {
        const loaded = loadGameStateFromLocalStorage()
        if (!loaded) {
            return []
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
            getHashSolution().then((value) => {
                setHashSolution(value)
                // const dataReq: gameReq = {
                //     guesses: guesses,
                //     hashSolution: value
                // }
                // UpdateGameStatus(dataReq).then((data) => {
                //     const {charStatuses, guessStatuses, isCorrectWord} = data
                //     setCharStatuses(charStatuses)
                //     setGuessStatuses(guessStatuses)
                // });
            });
        }
    })

    useEffect(() => {
        saveGameStateToLocalStorage({guesses, gameStatus, hashSolution, guessStatuses, charStatuses})
    }, [gameStatus, guessStatuses, guesses, hashSolution, charStatuses])

    useEffect(() => {
        if ('won' === gameStatus || 'lost' === gameStatus) {
            return
        }
        if (currentGuess.length === SOLUTION_LENGTH) {
            console.log('Done')

            // setIsRevealing(true)
            // // turn this back off after all
            // // chars have been revealed
            // setTimeout(() => {
            //     setIsRevealing(false)
            // }, REVEAL_TIME_MS * SOLUTION_LENGTH)

            const dataReq: gameReq = {
                guesses: guesses,
                hashSolution: hashSolution
            }
            UpdateGameStatus(dataReq).then((data) => {
                const {charStatuses, guessStatuses, isCorrectWord} = data
                setCharStatuses(charStatuses)
                setGuessStatuses(guessStatuses)
                if (guesses.length < MAX_CHALLENGES) {
                    setGuesses([...guesses, currentGuess])
                    console.log([...guesses, currentGuess])
                    setCurrentGuess('')

                    if (isCorrectWord) {
                        return setGameStatus('won')
                    } else if (guesses.length === MAX_CHALLENGES - 1) {
                        setGameStatus('lost')
                    }
                }
            })
        }
    }, [currentGuess])

    useEffect(() => {
        if ('won' === gameStatus) {
            showSuccessAlert(WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)])
        }

        if ('lost' === gameStatus) {
            showErrorAlert(CORRECT_WORD_MESSAGE('solution'))
            //todo get solution from server!
        }
    }, [gameStatus, showErrorAlert, showSuccessAlert])

    const onChar = (value: string) => {
        if (
            (currentGuess + value).length <= SOLUTION_LENGTH &&
            guesses.length < MAX_CHALLENGES &&
            'won' !== gameStatus
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
                    guesses={guesses}
                    currentGuess={currentGuess}
                    isRevealing={isRevealing}
                    guessStatuses={guessStatuses}
                />
            </div>
            <Keyboard
                onChar={onChar}
                onDelete={onDelete}
                guesses={guesses}
                isRevealing={isRevealing}
                charStatuses={charStatuses}
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
