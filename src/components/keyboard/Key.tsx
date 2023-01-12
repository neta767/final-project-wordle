import classnames from 'classnames'
import React from 'react'

import {REVEAL_TIME_MS, SOLUTION_LENGTH} from '../../constants/settings'
import {CharStatus} from "../../lib/server-requests";

type Props = {
    value: string
    width?: number
    status?: CharStatus
    onClick: (value: string) => void
    isRevealing?: boolean
}

export const Key = ({
                        status,
                        width = 40,
                        value,
                        onClick,
                        isRevealing,
                    }: Props) => {
    const keyDelayMs = REVEAL_TIME_MS * SOLUTION_LENGTH

    const classes = classnames(
        'xxshort:h-8 xxshort:w-8 xxshort:text-xxs xshort:w-10 xshort:h-10 flex short:h-12 h-14 items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white',
        {
            'transition ease-in-out': isRevealing,
            'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400':
                !status,
            'bg-slate-400 dark:bg-slate-800 text-white':
                status === 'absent',
            'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white':
                status === 'correct',
            'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white':
                status === 'present',
        }
    )

    const styles = {
        transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
        width: `${width}px`,
    }

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        onClick(value)
        event.currentTarget.blur()
    }

    return (
        <button
            style={styles}
            className={classes}
            onClick={handleClick}
        >
            {value}
        </button>
    )
}
