import React from 'react'
import { signInWithPopup} from 'firebase/auth'
import {auth, googleProvider} from '../utils/firebase.js'
import api from '../utils/axios.js'
import Home from './pages/Home.jsx'

function App() {

  return (
    <>
      <Home/>
    </>
  )
}

export default App
