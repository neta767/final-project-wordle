import {MAX_CHALLENGES} from '../../constants/settings'
import {CompletedRow} from './CompletedRow'
import {CurrentRow} from './CurrentRow'
import {EmptyRow} from './EmptyRow'
import {CharStatus} from "../../lib/server-requests";

type Props = {
    guesses: string[]
    currentGuess: string
    isRevealing?: boolean
    guessStatuses: CharStatus[]
}

export const Grid = ({
                         guesses,
                         currentGuess,
                         isRevealing,
                         guessStatuses
                     }: Props) => {
    const empties =
        guesses.length < MAX_CHALLENGES - 1
            ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
            : []

    return (
        <>
            {guesses.map((guess, i) => (
                <CompletedRow
                    key={i}
                    guess={guess}
                    isRevealing={isRevealing && guesses.length - 1 === i}
                    guessStatuses={guessStatuses}
                />
            ))}
            {guesses.length < MAX_CHALLENGES && (
                <CurrentRow guess={currentGuess}/>
            )}
            {empties.map((_, i) => (
                <EmptyRow key={i}/>
            ))}
        </>
    )
}
