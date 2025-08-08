import React from 'react'
import './App.css'
import Editor from './Editor' // <-- detta är din nya editor-komponent

function App() {
  return (
    <div className="App">
      <h1>Tiptap Editor i React</h1>
      <Editor />  {/* Här visas editorn på sidan */}
    </div>
  )
}

export default App

