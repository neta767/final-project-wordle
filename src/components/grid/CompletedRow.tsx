import {getGuessStatuses} from '../../lib/statuses'
import {Cell} from './Cell'

type Props = {
    guess: string
    isRevealing?: boolean
}

export const CompletedRow = ({guess, isRevealing}: Props) => {
    const statuses = getGuessStatuses(guess)
    const splitGuess = guess.split('')

    return (
        <div className="mb-1 flex justify-center">
            {splitGuess.map((letter, i) => (
                <Cell
                    key={i}
                    value={letter}
                    status={statuses[i]}
                    position={i}
                    isRevealing={isRevealing}
                    isCompleted
                />
            ))}
        </div>
    )
}
