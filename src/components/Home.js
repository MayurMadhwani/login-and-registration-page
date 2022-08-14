import { Avatar, Button, TextField } from '@mui/material';
import { signOut } from 'firebase/auth';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components'
import { emailSetter } from '../features/email/emailSlice';
import { auth, db, storage } from '../firebase';

const Home = () => {

    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const [imageURL, setImageURL] = useState(null);
    const email = useSelector((state)=>state.email.value);
    const dispatch = useDispatch();

    const edit = ()=>{
        setEditing(true);
    }

    const save = async()=>{

        if(name.length === 0){
            alert("Invalid name");
            return ;
        }
        
        console.log(name);

        const querySnapshot = await getDocs(collection(db,email));
            
        querySnapshot.forEach(async(data) => {
            
            const emailRef = doc(db, email, data.id);

            await updateDoc(emailRef,{
                name: name
            });

        });

        setEditing(false);
    }

    const signOutHandler = ()=>{

        signOut(auth).then(()=>{
            navigate('/');
        })

        dispatch(emailSetter(''));

    }

    const changeImage = async(e)=>{
        
        const file = e.target.files[0];

        const imageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        setImageURL(url);

        const querySnapshot = await getDocs(collection(db,email));

        querySnapshot.forEach(async(data) => {
            
            const emailRef = doc(db, email, data.id);

            await updateDoc(emailRef,{
                imageURL: url
            });

        });

    }

    useEffect(() => { 

        if(email.length === 0){
            navigate('/');
        }

        const getData = async()=>{
            
            const querySnapshot = await getDocs(collection(db,email));
            
            querySnapshot.forEach((doc) => {
                setName(doc.data().name);
                setImageURL(doc.data().imageURL);
            });
            
        }

        getData();

    }, [])
    
  return (
    <Main>
        <Container style={{zIndex:editing?"0":"3"}}>
            
            <Image onClick={changeImage}>
                
                <Avatar
                    alt={name[0]}
                    src={imageURL}
                    type='file'
                    sx={{ width: 200, height: 200 }}
                />
                
                <label htmlFor='file-input'>
                    <i class="fa-solid fa-camera"></i>
                </label>
                <input id='file-input' type='file' onChange={changeImage}></input>

            </Image>
            
            <Name>
                <Span>Name: {name}</Span>
                <i onClick={edit} class="fa-solid fa-pen-to-square"></i>
            </Name>
            <Button onClick={signOutHandler} variant="contained">Sign Out</Button>
        </Container>       
        
        <Edit style={{zIndex:editing?'3':'0'}}>
            <i onClick={()=>{setEditing(false)}}class="fa-regular fa-circle-xmark"></i>
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

            <Button onClick={save} variant="contained">Save</Button>
        </Edit>
        <Backdrop 
            style={{zIndex:editing?'2':'0'}}
            onClick={()=>{setEditing(false)}}    
        />

    </Main>
  )
}

const Main = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
  height: 650px;
  width: 600px;
  border-radius: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

const Name = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px 5px 10px;
    border-radius: 20px;
    margin: 100px;
    width: 400px;
    height: 50px;
    align-self: flex-start;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    i{

        &:hover{
            cursor:pointer;
        }

    }

`

const Backdrop = styled.div`
  height: 650px;
  width: 600px;
  border-radius: 25px;
  background-color: grey;
  opacity: 0.5;
  position: absolute;
`

const Span = styled.span`
`

const Edit = styled.div`
    width: 500px;
    height: 350px;
    background-color: white;
    position: absolute;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 25px;
    i{
        margin:30px;
        font-size: 20px;
        
        &:hover{
            cursor:pointer;
        }

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

const Image = styled.div`
    z-index: 0;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;

    label{
        position: absolute;
        margin: 0px;
        padding: 0px;
        width: 56px;
        height: 56px;
    }

    i{
        transition-duration: 0.4s;
        z-index: -1;
        opacity: 0.7;
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        position: absolute;
        border-radius: 30px;
        cursor: pointer;
    }
    input{
        display: none;
        z-index:-3;
    }
    &:hover{
        cursor:pointer;
        i{
            z-index: 2;
            transition-duration: 0.4s;
        }
    }
`

export default Home