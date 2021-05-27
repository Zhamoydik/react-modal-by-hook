import { useState } from "react"

const useForceUpdate = () => {
  const [state, setState] = useState(0)

  return () => setState(Math.floor(Math.random() * 1000000) + state - state)
}

export default useForceUpdate
