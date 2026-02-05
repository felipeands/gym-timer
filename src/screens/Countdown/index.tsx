import CountDown from "../../components/CountDown"
import { useTrainingContext } from "../../contexts/TrainingContext"

const Countdown = () => {
    const { setCurrentScreen, startCycle } = useTrainingContext()

    const handleFinish = () => {
        startCycle()
        setCurrentScreen('Running')
    }

    return <CountDown time={3} onFinish={handleFinish} />
}

export default Countdown
