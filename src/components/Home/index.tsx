import React from "react"
import { useModal } from "components/Modal"
import s from "./index.module.css"

const Home = () => {
  const modal = useModal()

  const handleClickOpenModal = () => {
    modal.open({
      data: "move this to callbacks",
      message: "Are you sure you want to proceed?",
      onOk: async (data) => alert(data),
    })
  }

  return (
    <div className={s.home}>
      <button className={s.button} onClick={handleClickOpenModal}>
        Open modal
      </button>
    </div>
  )
}

export default Home
