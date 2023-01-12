import {useNavigate} from 'react-router-dom'

type Props = {
    userName: string | null
}

function HomePage({userName}: Props) {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center">
            <form>
                <p className="text-xl font-bold dark:text-white text-center mb-5">Welcome {userName ? userName : 'guest'}!</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => navigate('game')}
                >
                    Start to play
                </button>
            </form>
        </div>
    )
}

export default HomePage
