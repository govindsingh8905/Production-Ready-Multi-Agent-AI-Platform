import {getAuth} from "firebase-admin/auth"
import{app} from "../config/firebase.js"
import User from "../models/user.model.js"


export const login = async (req,res)=>{
 try {
    const {token} = req.body
    const decoded = await getAuth(app)
    decoded.verifyIdToken(token)
    const user = await User.findOne({
      firebaseUid:decoded.uid
    })
    if(!user){
      user = await User.create({
         firebaseUid:decoded.uid,
         name:decoded.name,
         email:decoded.email,
         avatar:decoded.picture
      })


    }

    const sessionId= crypto.randomUUID()
    res.cookie("session",sessionId,+{
      httpOnly:true,
      secure:false,
      sameSite:"strict"


    })

   } catch (error) { 
    
 }z
 
}