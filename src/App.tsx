import React from "react"
import Home from "./components/Home"
import { Provider as ModalProvider } from "components/Modal"

function App() {
  return (
    <ModalProvider>
      <Home />
    </ModalProvider>
  )
}

export default App
