import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase';
import { collection, addDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { emailSetter } from '../features/email/emailSlice';

const Register = ({top}) => {

  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const globalEmail = useSelector((state)=>state.email.value);

  useEffect(() => {
    
    if(globalEmail.length>0){
      navigate('/home');
    }

  }, [])
  

  const register = ()=>{
    
    if(email.length === 0){
      alert('Invalid Email or Password');
      return;
    }

    if(password.length<6){
      alert('Password must be atleast 6 characters long');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 

      addDoc(collection(db, email), {
        email: email,
        name: name,
        imageURL: '',
      })

      dispatch(emailSetter(email));

      alert('Registration successful')
      navigate('/home');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if(errorCode.includes('already')){
        alert(email + ' already exists');
      }

    });

  }

  return (
    <Main style={{zIndex:top?'2':'0'}}>
      <span>New User?</span>
      
      <Input>
        <TextField
            id="outlined-password-input"
            label="Name"
            type="name"
            autoComplete="current-password"
            style={{width:'100%'}}
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
          />
      </Input>
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
      <Button variant="contained" onClick={register}>Register</Button>
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

export default Register