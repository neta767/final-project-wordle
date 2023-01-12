import {Cell} from './Cell'
import {SOLUTION_LENGTH} from "../../constants/settings";

export const EmptyRow = () => {
    const emptyCells = Array.from(Array(SOLUTION_LENGTH))

    return (
        <div className="mb-1 flex justify-center">
            {emptyCells.map((_, i) => (
                <Cell key={i}/>
            ))}
        </div>
    )
}
