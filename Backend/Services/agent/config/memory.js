import redis from "../../../Shared/redis/redis.js"
import { getMessages } from "../utils/getMessages.js"

export const getMemory= async (conversationId)=>{
       const key = `messages-${conversationId}` // keyy of redis 

      const caches= await redis.get(key)
      if(caches){
        return JSON.parse(caches)
      }

      const messages= await getMessages(conversationId)
      await redis.set(key,JSON.stringify(messages),"EX",24*60*60)

      return messages

} 


export const addMessage= async (conversationId,role,content)=>{
    const key = `messages-${conversationId}` 

    const rawMessages= await redis.get(key)

    const messages = rawMessages?JSON.parse(rawMessages):[]

    messages.push({role,content})

    if(messages.length>20){
        messages.shift()
    }
    await redis.set(key,JSON.stringify(messages))

}