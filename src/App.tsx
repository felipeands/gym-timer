import styled from 'styled-components'
import { NewTraining, Running, EndCycle, EndTraining, History } from './screens';
import { TrainingContextProvider, useTrainingContext } from './contexts/TrainingContext';

const Screen = () => {
  const { currentScreen } = useTrainingContext()
  switch (currentScreen) {
    case 'NewTraining':
      return <NewTraining />
    case 'Running':
      return <Running />
    case 'EndCycle':
      return <EndCycle />
    case 'EndTraining':
      return <EndTraining />
    case 'History':
      return <History />
  }
}

function App() {

  // const currentScreen = () => {
  //   switch
  // }

  return (
    <TrainingContextProvider>
      <AppWrapper>
        <Screen />
        {/* <NewTraining /> */}
        {/* <Running /> */}
        {/* <EndCycle /> */}
        {/* <EndTraining /> */}
      </AppWrapper>
    </TrainingContextProvider>
  );
}

export default App

const AppWrapper = styled.div`
  font-family: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  * {
    font-family: inherit;
  }
`