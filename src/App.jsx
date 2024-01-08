import React from 'react'
import Canvas from './Components/canvas'
import Header from './Components/header'
import { DrawingProvider } from './DrawingContext';


export default function App() {
  return (
    <div>
      <DrawingProvider>
        <Header />
        <Canvas />
      </DrawingProvider>
    </div>
  )
}
