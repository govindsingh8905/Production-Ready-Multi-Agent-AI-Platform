import redis from "../../Shared/redis/redis"

const protect=async (req,res,next)=>{
      try{
        const sessionId=req.cookies?.session
        if(!sessionId){
           res.status(400).json({message:"session not found"})
        }
        await redis 
      }catch{
        res.status(500).json({message:"Internal server error"}) 
      }
}   
      
