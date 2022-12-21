import {BaseModal} from './BaseModal'
import {SettingsToggle} from './SettingsToggle'

type Props = {
    isOpen: boolean
    handleClose: () => void
    isDarkMode: boolean
    handleDarkMode: Function
}

export const SettingsModal = ({
                                  isOpen,
                                  handleClose,
                                  isDarkMode,
                                  handleDarkMode,
                              }: Props) => {
    return (
        <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
            <div className="mt-2 flex flex-col divide-y">
                <SettingsToggle
                    settingName="Dark Mode"
                    flag={isDarkMode}
                    handleFlag={handleDarkMode}
                />
            </div>
        </BaseModal>
    )
}
