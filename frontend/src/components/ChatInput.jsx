import { Mic, Paperclip, Send } from 'lucide-react'
import React, { useState } from 'react'
import sendMessage from '../features/sendMessage'
import { useDispatch, useSelector } from 'react-redux'
import { isEnabled } from 'parse/lib/browser/LocalDatastore'
import { addMessages, setMessages } from '../redux/messageSlice'
import { createConversation } from '../features/createConversation.js'
import { addConversation, setSelectedConversation } from '../redux/conversationSlice.js'

function ChatInput() {
    const [value,setValue]=useState("")
    const {selectedConversation}=useSelector(state=>state.conversation)
    const { messages } = useSelector((state) => state.message);
    const dispatch=useDispatch();
    const handleSendMessage=async()=>{
        let conversation = selectedConversation
        if(!conversation){
            const conv=await createConversation()
            dispatch(setSelectedConversation(conv))
            dispatch(addConversation(conv))
            conversation=conv
        }

        const payload={prompt:value.trim(),conversationId:conversation?._id}

        dispatch(addMessages({role:"user",content:value.trim()}))
        setValue("");
        const data = await sendMessage(payload)
         dispatch(addMessages({role:"assistant",content:data}))
        console.log(data)
    }
  return (
    <div className='w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/[0.06] bg-[#0d0f14] '>
        <div className='flex flex-col bg-white/[0.06] border px-4 pt-3.5 pb-3 border-white/[0.07] gap-2 rounded-2xl'>
        <textarea  rows={3} 
        onChange={(e)=>setValue(e.target.value)}
        value={value} // value set krdi ab jaise hi value change hogi toh setvalue ke through value me set ho jayegi 
        placeholder='Ask Anything..'
        className='w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden disabled:opacity-50'/>
    <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
            <button className='flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 border-transparent hover:border-white/[0.06] cursor-pointer'>
                <Paperclip size={16}/>
            </button>

        <button className='flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 border-transparent hover:border-white/[0.06] cursor-pointer'>
            <Mic size={18}/>
        </button>

        </div>
        <button 
        disabled={!value}
        onClick={handleSendMessage}
        className={`flex items-center justify-center w-8 h-8 rounded-lg border-none cursor-pointer transition-all duration-150 ${value.trim()?"bg-linear-to-br from-indigo-500 to-violet-700 hover:opacity-95 text-white":"bg-white/[0.05] text-slate-600 cursor-not-allowed"}`}>
            <Send size={16}/>
        </button>


     </div>

     </div>
      
    </div>
  )
}

export default ChatInput
