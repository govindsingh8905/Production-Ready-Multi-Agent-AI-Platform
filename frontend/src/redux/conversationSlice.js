import { createSlice } from "@reduxjs/toolkit";

const conversationSlice= createSlice({
    name:"conversation",
    initialState:{
        conversations:[]
    },
    reducers:{
        setConversations:(state,action)=>{
            state.conversations=action.payload
        },
        addConversation:(state,action)=>{
            state.conversations.unshift(action.payload) // purana data same rhega but koi new conversation iss conversation me daal denge
        }
    }
})

export const {setConversations, addConversation}=conversationSlice.actions
export default conversationSlice.reducer