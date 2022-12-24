import {solution} from '../../lib/words'
import {Cell} from './Cell'

type Props = {
    guess: string
}

export const CurrentRow = ({guess}: Props) => {
    const splitGuess = guess.split('')
    const emptyCells = Array.from(Array(solution.length - splitGuess.length))
    const classes = `flex justify-center mb-1`

    return (
        <div className={classes}>
            {splitGuess.map((letter, i) => (
                <Cell key={i} value={letter}/>
            ))}
            {emptyCells.map((_, i) => (
                <Cell key={i}/>
            ))}
        </div>
    )
}
