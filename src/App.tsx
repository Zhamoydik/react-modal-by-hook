import React from "react"
import { Modal, useModal } from "components/Modal"
import logo from "./logo.svg"
import "./App.css"

function App() {
  const modal = useModal()

  const handleClickLogo = () => {
    modal.open({
      data: "Something really important",
      message: "This is the sign you have been waiting for",
      onOk: async () => alert("Everything is okay!"),
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={handleClickLogo}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
      <Modal modal={modal} />
    </div>
  )
}

export default App
