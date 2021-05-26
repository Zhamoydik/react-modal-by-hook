import { createPortal } from "react-dom"
import { Props, Instance } from "./types"
import useModal from "./useModal"
import { Provider, ModalContext } from "./Provider"

const modalRoot = document.getElementById("modal-root") as HTMLElement

const ModalLayout = (props: Instance<unknown>) => {
  return <button onClick={props.internalHandlers.onOk}>{props.message}</button>
}

export const Modal = ({ modal }: Props<unknown>) => {
  return modal.isOpen ? createPortal(<ModalLayout {...modal} />, modalRoot) : null
}

export { useModal, Provider, ModalContext }
