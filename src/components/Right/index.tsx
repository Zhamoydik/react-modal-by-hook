import { useModal } from "components/Modal"
import Button from "components/Button"
import s from "./index.module.css"

const Right = () => {
  const modal = useModal()

  const handleClickOpen = () => {
    modal.open({
      data: "right side",
      body: "Opened from right",
      onOk: async (data) => alert(data),
    })
  }

  return (
    <div className={s.right}>
      <Button onClick={handleClickOpen}>Open right modal</Button>
    </div>
  )
}

export default Right
