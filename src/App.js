import styled from 'styled-components'
import FirstPage from './components/FirstPage';
import Home from './components/Home';
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <Main>
      <Routes>
        <Route path='/' element={<FirstPage/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>      
    </Main>
  );
}

const Main = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  font-family: 'Open Sans', sans-serif;
  font-family: 'Raleway', sans-serif;
`



export default App;
