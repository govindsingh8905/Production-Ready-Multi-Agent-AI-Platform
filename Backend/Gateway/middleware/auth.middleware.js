import redis from "../../Shared/redis/redis.js"

const protect=async (req,res,next)=>{
      try{
        const sessionId=req.cookies?.session
        if(!sessionId){
           res.status(400).json({message:"unauthorized session id not found "})
        }
        const session=await redis.get(`session-${sessionId}`)
        if(!session){
            return res.status(400).json({
                message:"session expired"
            })
        }
        req.user=JSON.parse(session)
        next()
      }catch{
        res.status(500).json({message:"Internal server error"}) 
      }
}   

export default protect
 