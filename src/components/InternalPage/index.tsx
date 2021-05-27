import s from "./index.module.css"
import { useModal } from "../Modal"
import React from "react"

const InternalPage = () => {
  const modal = useModal()

  const handleClickOpenModal = () => {
    modal.open({
      data: "move this to callbacks",
      message: "Modal from internal page",
      onOk: async (data) => alert(data),
    })
  }

  return (
    <div className={s.internal}>
      <button className={s.button} onClick={handleClickOpenModal}>
        Open modal
      </button>
    </div>
  )
}

export default InternalPage
