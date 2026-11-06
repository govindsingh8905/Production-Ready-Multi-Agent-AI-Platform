import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name:"user",
    initialState:{
        userData:null
    },
    reducers:{ // state ke andar ke data ko update krne ke liye hota h reducers
        setUserData:(state,action)=>{
            state.userData=action.payload


        }
    }
})

export const {setUserData}=userSlice.actions
export default userSlice.reducer