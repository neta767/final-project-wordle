import {BaseModal} from './BaseModal'
import {useForm} from "react-hook-form";

type Props = {
    isOpen: boolean
    handleClose: () => void
    handleLogin: (name: string) => void
}

type Inputs = {
    name: string,
};

export const LoginModal = ({isOpen, handleClose, handleLogin}: Props) => {
    const {register, handleSubmit} = useForm<Inputs>()
    const onSubmit = (data: Inputs) => {
        handleLogin(data.name)
        handleClose()
    };
    return (
        <BaseModal title="Login" isOpen={isOpen} handleClose={handleClose}>
            <div className="mt-2 flex flex-col divide-y">
                <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block font-bold mb-2 dark:text-white text-start">
                            Username
                            <input  {...register("name")}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
                                    type="text" placeholder="Username"/>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <input type="submit" value="Submit"
                               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"/>
                    </div>
                </form>
            </div>
        </BaseModal>

    )
}
