import { createSlice } from "@reduxjs/toolkit";

const conversationSlice= createSlice({
    name:"conversation",
    initialState:{
        conversations:[],
        selectedConversation:null
    },
    reducers:{
        setConversations:(state,action)=>{
            state.conversations=action.payload
        },
        addConversation:(state,action)=>{
            state.conversations.unshift(action.payload) // purana data same rhega but koi new conversation iss conversation me daal denge
        },
         setSelectedConversation:(state,action)=>{
            state.selectedConversation=action.payload
        }
    }
})

export const {setConversations, addConversation, setSelectedConversation}=conversationSlice.actions
export default conversationSlice.reducer