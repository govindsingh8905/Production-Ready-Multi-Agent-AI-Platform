import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
import { getModel } from "../config/llmModels.js"
import { getMemory } from "../config/memory.js"

export const chatAgent=async(state)=>{
    const llm = await getModel("chat")
    const history= await getMemory(state.conversationId)

    const searchContext = state.searchResults?`
    Web Search Results:
    ${JSON.stringify(state.searchResults)}
    Answer the user using only the above results.
`:""
    
    
    
    
    const systemPrompt = `you are cortex Ai, an intelligent assistant
    
    
    ${searchContext}
    if there is searchcontext exists:
    - use search results to answer.
    -do not mention internal tools.
    
    
    
    
    rules:
    for simple question , greetings and short question , respond naturally in plain text.
    - for technical,educational ,coding or detailed topics , use clean Markdown.
    formatting :
     -use # for titles and ## for sections 
     -leave a blank line after heading 
     -use bullet points for lists 
     -use numbered list for steps
     -use fenced code blocks with language tags for code 
     -never write headings and content on the same line
     -never generate large walls of text 
     -keep paragraphs large walls of text.
     `


       const messages=[
        new SystemMessage(systemPrompt)

       ]

       history.forEach(msg => {
        if(msg.role=="user"){
            messages.push(new HumanMessage(msg.content))
        }else{
            messages.push(new AIMessage(msg.content))
        }
        
       });

       messages.push(new HumanMessage(state.prompt))

       console.log(messages)
const response = await llm.invoke(messages)
    return{
        ...state,
        aiResponse:response.content
    }


} 