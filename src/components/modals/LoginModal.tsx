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
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="block font-bold mb-4 dark:text-white text-start flex flex-col ">
                    Username
                    <input  {...register("name")}
                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
                            type="text" placeholder="Username"/>
                </label>
                <input type="submit" value="Submit"
                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"/>
            </form>
        </BaseModal>

    )
}
