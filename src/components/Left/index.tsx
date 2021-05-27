import { useModal } from "components/Modal"
import Button from "components/Button"
import s from "./index.module.css"

const Left = () => {
  const modal = useModal()

  const handleClickOpen = () => {
    modal.open({
      data: "left side",
      message: "Opened from left",
      onOk: async (data) => alert(data),
    })
  }

  return (
    <div className={s.left}>
      <Button onClick={handleClickOpen}>Open left modal</Button>
    </div>
  )
}

export default Left
