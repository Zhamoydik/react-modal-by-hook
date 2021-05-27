import React from "react"
import Right from "../Right"
import Left from "../Left"
import s from "./index.module.css"

const Home = () => {
  return (
    <div className={s.home}>
      <Left />
      <Right />
    </div>
  )
}

export default Home
