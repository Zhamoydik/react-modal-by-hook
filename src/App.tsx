import React from "react"
import Home from "./components/Home"
import { Provider as ModalProvider } from "components/Modal"
// import InternalPage from "./components/InternalPage"

function App() {
  return (
    <ModalProvider>
      <Home />
      {/*<InternalPage />*/}
    </ModalProvider>
  )
}

export default App
