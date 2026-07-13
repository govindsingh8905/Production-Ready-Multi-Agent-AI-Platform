import React from 'react'
import { signInWithPopup} from 'firebase/auth'
import {auth, googleProvider} from '../utils/firebase.js'

function App() {

  const googleLogin= async ()=>{
    const data =await signInWithPopup(auth,googleProvider)
    console.log(data)

  }
  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      <button className='w-56 h-24 bg-white  border-amber-800  ' onClick={googleLogin}> 
        Continue with google 
      </button>
    </div>
  )
}

export default App
