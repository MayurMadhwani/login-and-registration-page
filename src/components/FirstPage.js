import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const FirstPage = () => {

    const [registerOnTop, setRegisterOnTop] = useState(true);

  return (
    <Container>
        <Top>
          
          <Button style={{
            marginLeft:'40px',
            fontSize:'30px',
            width: '100%',
            margin:'0px',
            color:registerOnTop?'gray':'darkgray',
            backgroundColor:registerOnTop?'white':'lightgray',
            borderRadius: '25px 0px 0px 0px',
            fontFamily: 'Open Sans , sans-serif',
            fontFamily: 'Raleway , sans-serif',
            letterSpacing:"2px",
            }} 
            size="large"
            onClick={()=>{setRegisterOnTop(true)}}
            >
              Register
          </Button>
          
          <Button style={{
            marginRight:'40px',
            fontSize:'30px',
            width: '100%',
            margin:'0px',
            color: !registerOnTop?'gray':'darkgray',
            backgroundColor: !registerOnTop?'white':'lightgray',
            borderRadius: '0px 25px 0px 0px',
            fontFamily: 'Open Sans , sans-serif',
            fontFamily: 'Raleway , sans-serif',
            letterSpacing:"2px",
            }} 
            size="large"
            onClick={()=>{setRegisterOnTop(false);}}
            >
              Login
          </Button>

        </Top>

        <Login top={registerOnTop}/>
        <Register top={registerOnTop}/>

      </Container>
  )
}

const Container = styled.div`
  height: 650px;
  width: 600px;
  border-radius: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const Top = styled.div`
    background-color: white;
    height: 100px;
    width: 600px;
    position: absolute;
    display: flex;
    justify-content: space-between;
    border-radius: 25px;
`

export default FirstPage