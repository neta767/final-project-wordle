import {Grid} from './grid/Grid'
import {Keyboard} from './keyboard/Keyboard'
import {InfoModal} from "../components/modals/InfoModal";
import {AlertContainer} from "../components/alerts/AlertContainer";
import {useEffect, useState} from "react";
import {loadGameStateFromLocalStorage, saveGameStateToLocalStorage} from "../lib/localStorage";
import {REVEAL_TIME_MS} from "../constants/settings";
import {solution} from "../lib/words";

function GamePage() {
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
    // useEffect(() => {
    //     // if no game state on load,
    //     // show the user the how-to info modal
    //     if (!loadGameStateFromLocalStorage()) {
    //         setTimeout(() => {
    //             setIsInfoModalOpen(true)
    //             saveGameStateToLocalStorage({guesses, []})
    //         }, REVEAL_TIME_MS)
    //     }
    // })
    return (
        <div
            className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
            <div className="flex grow flex-col justify-center pb-6 short:pb-2">
                <Grid/>
            </div>
            <Keyboard/>
            <InfoModal
                isOpen={isInfoModalOpen}
                handleClose={() => setIsInfoModalOpen(false)}
            />
            <AlertContainer/>
        </div>
    )
}

export default GamePage
