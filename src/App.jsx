import { useState } from 'react'

import './App.css'

import FetchData from '../FetchData'
import MyFetch from './Components/Content'
import NavBar from './Components/NavBar'
// import Background from './Components/Background'

function App() {
  

  return (
    <>
      <NavBar />
      {/* <Background/> */}
      {/* <FetchData /> */}
      <MyFetch/>
      </>
  )
}

export default App
