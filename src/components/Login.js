import { Button, TextField } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import {auth} from '../firebase'
import { emailSetter } from '../features/email/emailSlice';

const Login = ({top}) => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const globalEmail = useSelector((state)=>state.email.value);

  useEffect(() => {
    
    if(globalEmail.length>0){
      navigate('/home');
    }

  }, [])

  const login = async()=>{ 
    
    if(email.length === 0){
      alert('Invalid Email or Password');
      return;
    }

    if(password.length<6){
      alert('Password must be atleast 6 characters long');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        dispatch(emailSetter(email));
        alert('Login successful');
        navigate('/home');
        
      })
      .catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;

        if(errorCode.includes('wrong-password')){
          alert('Wrong Password');
        }else if(errorCode.includes('user-not-found')){
          alert('User not found');
        }

      });

  }

  return (
    <Main style={{zIndex:top?'0':'3'}}>
      <span>Already Registered?</span>
      <Input>
        <TextField
            id="outlined-password-input"
            label="Email"
            type="email"
            autoComplete="current-password"
            style={{width:'100%'}}
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
      </Input>
      <Input>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          style={{width:'100%'}}
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
        />
      </Input>
      <Button variant="contained" onClick={login}>Login</Button>
    </Main>
  )
}

const Main = styled.div`
  background-color: white;
  height: 550px;
  width: 600px;
  position: absolute;
  margin-top: 100px;
  border-radius: 0px 0px 25px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Open Sans', sans-serif;
  font-family: 'Raleway', sans-serif;
  font-size: 25px;
  transition-duration: 0.4s;
  span{
    margin-bottom: 50px;
  }
`

const Input = styled.div`

  width: 400px;
  margin-bottom: 50px;
  label{
    font-family: 'Open Sans', sans-serif;
    font-family: 'Raleway', sans-serif; 
  }
  font-family: 'Open Sans', sans-serif;
  font-family: 'Raleway', sans-serif;

`

export default Login