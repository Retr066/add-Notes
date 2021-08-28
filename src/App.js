import styled from 'styled-components';
import Submit from './components/Submit';
import Notes from './components/Notes';
import AppProvider from './context/AppContext';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
`;
const Title = styled.h1`
  width: 50%;
  height: 10%;
  margin: 0 auto;
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  @media (max-width: 400px) {
    width: 80%;
    font-size: 2.5em;
  }
`;

function App() {
  return (
    <AppProvider>
      <Container>
        <Title>Applying Notes Using React Hooks</Title>
        <Submit></Submit>

        <Notes></Notes>
      </Container>
    </AppProvider>
  );
}

export default App;
