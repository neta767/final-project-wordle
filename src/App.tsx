import './App.css'

import {useEffect, useState} from 'react'

import AppRouter from './AppRouter'
import {Navbar} from './components/Navbar'
import {InfoModal} from './components/modals/InfoModal'
import {SettingsModal} from './components/modals/SettingsModal'
import {LoginModal} from "./components/modals/LoginModal"
import {getIsLogin, getUserName} from "./lib/localStorage";

function App() {
    const prefersDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
    const [isLogin, setLogin] = useState(getIsLogin)
    const [userName, setUserName] = useState(getUserName())
    //set dark mode as prefer from localstorage
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme')
            ? localStorage.getItem('theme') === 'dark'
            : prefersDarkMode
    )

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    const handleDarkMode = (isDark: boolean) => {
        setIsDarkMode(isDark)
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }

    const logout = () => {
        localStorage.removeItem('userName')
        setUserName('')
        setLogin(false)
    }

    function handleLogin(name: string) {
        localStorage.setItem('userName', name)
        setUserName(name)
        setLogin(true)
    }

    return (
        <div className="flex h-full flex-col">
            <Navbar
                setIsInfoModalOpen={setIsInfoModalOpen}
                setIsLoginModalOpen={setIsLoginModalOpen}
                setIsSettingsModalOpen={setIsSettingsModalOpen}
                logout={logout}
                isLogin={isLogin}
                userName={userName}
            />
            <AppRouter userName={userName}
            />
            <InfoModal
                isOpen={isInfoModalOpen}
                handleClose={() => setIsInfoModalOpen(false)}
            />
            <LoginModal
                isOpen={isLoginModalOpen}
                handleClose={() => setIsLoginModalOpen(false)}
                handleLogin={(name: string) => handleLogin(name)}
            />
            <SettingsModal
                isOpen={isSettingsModalOpen}
                handleClose={() => setIsSettingsModalOpen(false)}
                isDarkMode={isDarkMode}
                handleDarkMode={handleDarkMode}
            />
        </div>
    )
}

export default App
