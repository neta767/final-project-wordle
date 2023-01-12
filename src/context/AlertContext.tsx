import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useState,
} from 'react'

import {REVEAL_TIME_MS, SOLUTION_LENGTH} from '../constants/settings'
import {
    CORRECT_WORD_MESSAGE,
    WIN_MESSAGES,
} from '../constants/strings'

type AlertStatus = 'success' | 'error' | undefined

type AlertContextValue = {
    status: AlertStatus
    message: string | null
    isVisible: boolean
    showSuccess: (message?: string) => void
    showError: (message?: string) => void
}

export const AlertContext = createContext<AlertContextValue | null>({
    status: 'success',
    message: null,
    isVisible: false,
    showSuccess: () => null,
    showError: () => null,
})

export const useAlert = () => useContext(AlertContext) as AlertContextValue

type Props = {
    children?: ReactNode
}

export const AlertProvider = ({children}: Props) => {
    const [status, setStatus] = useState<AlertStatus>('success')
    const [message, setMessage] = useState<string | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    const show = useCallback(
        (showStatus: AlertStatus, newMessage: string) => {
            const delayMs = REVEAL_TIME_MS * SOLUTION_LENGTH

            setTimeout(() => {
                setStatus(showStatus)
                setMessage(newMessage)
                setIsVisible(true)
            }, delayMs)
        },
        [setStatus, setMessage, setIsVisible]
    )

    const showError = useCallback(
        (newMessage = CORRECT_WORD_MESSAGE('solution')) => {
            show('error', newMessage)
        },
        [show]
    )

    const showSuccess = useCallback(
        (newMessage = WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]) => {
            show('success', newMessage)
        },
        [show]
    )

    return (
        <AlertContext.Provider
            value={{
                status,
                message,
                isVisible,
                showError,
                showSuccess,
            }}
        >
            {children}
        </AlertContext.Provider>
    )
}