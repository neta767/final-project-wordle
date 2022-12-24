import {Grid} from './grid/Grid'
import {Keyboard} from './keyboard/Keyboard'
import {InfoModal} from "../components/modals/InfoModal";
import {AlertContainer} from "../components/alerts/AlertContainer";

function GamePage() {
    return (
        <div
            className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
            <div className="flex grow flex-col justify-center pb-6 short:pb-2">
                <Grid/>
            </div>
            <Keyboard/>
            <InfoModal/>
            <AlertContainer/>
        </div>
    )
}

export default GamePage
