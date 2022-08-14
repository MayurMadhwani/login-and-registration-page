import { createSlice } from "@reduxjs/toolkit";

export const emailSlice = createSlice({

    name: 'email',
    
    initialState:{
        value:'',
    },

    reducers:{
        emailSetter: (state, action)=>{
            state.value = action.payload
        }
    }
})

export const {emailSetter} = emailSlice.actions;

export default emailSlice.reducer
