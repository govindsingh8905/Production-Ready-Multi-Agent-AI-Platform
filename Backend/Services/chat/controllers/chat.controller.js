import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async(req, res) => {
   try {
    const userId = req.headers["x-user-id"]
    console.log("userId", userId);
    const conversation = await Conversation.create({ userId:userId });
    res.status(200).json(conversation);
   } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating conversation" });
   }
};

export const getConversations = async(req, res) => {
   try {
    const userId = req.headers["x-user-id"]
    console.log("userId", userId);
    const conversations = await Conversation.find({ userId:userId }).sort({ updatedAt: -1 });  // recent bani hui userid ko top per lee aao 
    res.status(200).json(conversations);
   } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting conversations" });
   }
};



export const saveMessage=async (req,res)=>{
    try {
        const{conversationId,role,content} = req.body;
        const message = await Message.create({ conversationId, role, content });
        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error saving message${error}`});
    }

}

export const getMessages=async (req,res)=>{
    try {
        const messages = await Message.find({ conversationId:req.params.conversationId

         }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `get messages error${error}`});
    }

}

export const updateConversation = async(req, res) => {
   try {
    const{id,title} = req.body;
    const conversation = await Conversation.findByIdAndUpdate(id, {title});
    res.status(200).json(conversation);
   } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting conversations" });
   }
};

