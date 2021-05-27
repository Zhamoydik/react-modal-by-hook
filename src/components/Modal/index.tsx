import React, { useEffect, useRef } from "react"
import { ModalProps } from "./types"
import useModal from "./useModal"
import { Provider, ModalContext } from "./Provider"
import Cross from "assets/icons/Cross.svg"
import s from "./index.module.css"

const ModalLayout = (props: ModalProps<unknown>) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const okRef = useRef<HTMLButtonElement>(null)

  const handleClickClose = () => {
    props.internalHandlers.onClose()
  }

  const handleMouseDownDocument = (e: MouseEvent) => {
    if (!dialogRef.current || (e.target instanceof Node && dialogRef.current?.contains(e.target))) return
    props.internalHandlers.onClose()
  }

  const handleKeyDownDocument = (e: KeyboardEvent) => {
    if (e.code?.includes("Enter")) {
      okRef.current?.focus()
      okRef.current?.click()
    }
    if (e.code === "Escape") cancelRef.current?.click()
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDownDocument)
    document.addEventListener("keydown", handleKeyDownDocument)

    return () => {
      document.removeEventListener("mousedown", handleMouseDownDocument)
      document.removeEventListener("keydown", handleKeyDownDocument)
    }
  })

  return (
    <div className={s.overlay}>
      <div className={s.dialog} ref={dialogRef}>
        <div className={s.header}>
          <span className={s.title}>Confirm action</span>
          <img className={s.close} src={Cross} alt="Close" title="Close" onClick={handleClickClose} />
        </div>
        <div className={s.body}>{props.message}</div>
        <div className={s.footer}>
          <button className={s.button} ref={cancelRef} onClick={props.internalHandlers.onCancel}>
            Cancel
          </button>
          <button className={s.button} ref={okRef} onClick={props.internalHandlers.onOk}>
            Ок
          </button>
        </div>
      </div>
    </div>
  )
}

export const Modal = (props: ModalProps<unknown>) => {
  return props.isOpen ? <ModalLayout {...props} /> : null
}

export { useModal, Provider, ModalContext }
