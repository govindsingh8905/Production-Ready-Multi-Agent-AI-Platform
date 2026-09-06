import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";
import { searchAgent } from "../agents/search.agent";
import { codingAgent } from "../agents/coding.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { imageAgent } from "../agents/image.agent.js";

const workflow = new StateGraph(agentState)

workflow.addNode("router", router) // "Router"--> node name 
workflow.addNode("chat", chatAgent) // "Chat"--> node name
workflow.addNode("search", searchAgent) // "Search"--> node name
workflow.addNode("coding", codingAgent) // "Coding"--> node name
workflow.addNode("pdf",  pdfAgent) // "PDF"--> node name
workflow.addNode("ppt", pptAgent) // "PPT"--> node name
workflow.addNode("image", imageAgent) // "Image"--> node name


workflow.addEdge("__start__", "router")
workflow.addConditionalEdges("router",(state)=>{
    switch (state.agent) {
        case "chat":
            return "chat";
        case "search":
            return "search";
        case "coding":
            return "coding";
        case "pdf":
            return "pdf";
        case "ppt":
            return "ppt";
        case "image":
            return "image";
        default:
            return "chat"
    }
},{
    chat:"chat", 
    search:"search",
    coding:"coding",  // path set mapping
    pdf:"pdf",
    ppt:"ppt",
    image:"image"
})

workflow.addEdge("search", "chat")
workflow.addEdge("chat","__end__")
workflow.addEdge("coding","__end__")
workflow.addEdge("pdf","__end__")
workflow.addEdge("ppt","__end__")
workflow.addEdge("image","__end__")


export const graph = workflow.compile()
