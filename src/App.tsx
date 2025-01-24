import styled from 'styled-components'
import { NewExercise, Running, EndCycle, EndTraining } from './screens';

function App() {
  return (
    <AppWrapper>
      <NewExercise />
      <Running />
      <EndCycle />
      <EndTraining />
    </AppWrapper>
  );
}

export default App

const AppWrapper = styled.div``