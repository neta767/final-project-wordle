import {useEffect} from 'react'

import {getStatuses} from '../../lib/statuses'
import {Key} from './Key'

type Props = {
    onChar: (value: string) => void
    onDelete: () => void
    guesses: string[]
    isRevealing?: boolean
}

export const Keyboard = ({
                             onChar,
                             onDelete,
                             guesses,
                             isRevealing,
                         }: Props) => {
    const charStatuses = getStatuses(guesses)

    const onClick = (value: string) => {
        // if (value === 'ENTER') {
        //     onEnter()
        // } else
        if (value === 'Delete') {
            onDelete()
        } else {
            onChar(value)
        }
    }

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.code === 'Backspace') {
                onDelete()
            } else {
                const key = e.key.toUpperCase()
                // TODO: check this test if the range works with non-english letters
                if (key.length === 1 && key >= 'A' && key <= 'Z') {
                    onChar(key)
                }
            }
        }
        window.addEventListener('keyup', listener)
        return () => {
            window.removeEventListener('keyup', listener)
        }
    }, [onDelete, onChar])

    return (
        <div>
            <div className="mb-1 flex justify-center">
                {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
                    <Key
                        value={key}
                        key={key}
                        onClick={onClick}
                        status={charStatuses[key]}
                        isRevealing={isRevealing}
                    />
                ))}
            </div>
            <div className="mb-1 flex justify-center">
                {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
                    <Key
                        value={key}
                        key={key}
                        onClick={onClick}
                        status={charStatuses[key]}
                        isRevealing={isRevealing}
                    />
                ))}
            </div>
            <div className="flex justify-center">
                {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
                    <Key
                        value={key}
                        key={key}
                        onClick={onClick}
                        status={charStatuses[key]}
                        isRevealing={isRevealing}
                    />
                ))}
                <Key
                    width={65.4}
                    value="Delete"
                    onClick={onClick}
                />
            </div>
        </div>
    )
}
