import axios from "axios"
import { graph } from "../graph/graph.js"
import { addMessage } from "../config/memory.js"

export const agent = async(req,res)=>{
    try{
        const {prompt,conversationId,agent} = req.body
        await axios.post(`${process.env.CHAT_SERVICE}/save-messages`, {
          conversationId,role:"user",content:prompt
        }) // database me save hogi conversationid role prompt 

        const result = await graph.invoke({
            prompt,
            conversationId,
            agent
        })
        const response =result.aiResponse  
        // graph invoke

        await addMessage(conversationId,"user",prompt)

         await addMessage(conversationId,"assistant",response)
   


          await axios.post(`${process.env.CHAT_SERVICE}/save-messages`, {
          conversationId,role:"assistant",content:response,images:result.images
        }) 

        

        return res.status(200).json({
            answer:response,
            images:result.images
        })



    }catch(error){
        return res.status(500).json({ message:`agent error ${error}`})
    }
}