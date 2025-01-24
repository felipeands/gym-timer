type Props = {
  time: number
  onFinish: () => void
}

const CountDown = ({ time, onFinish }: Props) => {
  setTimeout(onFinish, time * 1000)
  return (
    <h1>3 .. 2 .. 1</h1>
  )
}

export default CountDown