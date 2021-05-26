import { createPortal } from "react-dom"
import { Props, Instance } from "./types"
import useModal from "./useModal"
import { Provider, ModalContext } from "./Provider"
import Cross from "assets/icons/Cross.svg"
import s from "./index.module.css"

const modalRoot = document.getElementById("modal-root") as HTMLElement

const ModalLayout = (props: Instance<unknown>) => {
  const handleClickClose = () => {
    props.internalHandlers.onClose()
  }

  return (
    <div className={s.overlay}>
      <div className={s.dialog}>
        <div className={s.header}>
          <span className={s.title}>Confirm action</span>
          <img className={s.close} src={Cross} alt="Close" title="Close" onClick={handleClickClose} />
        </div>
        <div className={s.body}>{props.message}</div>
        <div className={s.footer}>
          <button className={s.button} onClick={props.internalHandlers.onCancel}>
            Cancel
          </button>
          <button className={s.button} onClick={props.internalHandlers.onOk}>
            Ок
          </button>
        </div>
      </div>
    </div>
  )
}

export const Modal = ({ modal }: Props<unknown>) => {
  return modal.isOpen ? createPortal(<ModalLayout {...modal} />, modalRoot) : null
}

export { useModal, Provider, ModalContext }
