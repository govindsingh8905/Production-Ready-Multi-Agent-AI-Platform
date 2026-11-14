import { getModel } from "../config/llmModels.js"

export const router = async (state) => {
    if(state.agent && state.agent!=="auto"){
         return {
        ...state,
        agent:state.agent
    }

    }






    const llm = await getModel("router")
    const prompt = `you are an agent router
    Available agents: chat, search, coding, pdf, ppt, image
    Rules:
    chat:
    genral conversation,
    explainations,
    learning,
    questions.

    search:
    information retrieval,
    fact checking,
    lastest information,
    internet lookup,
    research.

    coding:
    code generation,
    debugging,
    build project,
    architecture,
    api design,
    code explanation.

    pdf:
    pdf processing,
    document analysis.

    ppt:
    presentation creation,
    slide design.

    image:
    image generation,
    image editing.

    Return only one word :

    chat
    search 
    coding
    pdf
    ppt
    pdf
    image 

    

    User Query:
    ${state.prompt}


    
    `

    const response = await llm.invoke(prompt)

}