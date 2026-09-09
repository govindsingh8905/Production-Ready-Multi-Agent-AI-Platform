import { getModel } from "../config/llmModels.js"

export const chatAgent=async(state)=>{
    const llm = await getModel("chat")
    const systemPrompt = "you are cortex Ai, an intelligent assistant"
    const response = await llm.invoke([
        {
            "role":"system",
            "content":systemPrompt // pre prompting 

        },
        {
            "role":"user",
            "content":state.prompt // its coming fron the user side!
        }


    ])
    return{
        ...state,
        aiResponse:response.content
    }


} 