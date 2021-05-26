import * as React from "react"
import { useRef, useState } from "react"
import { Handlers, OpenRequest, ContextValueType } from "./types"
import { Modal } from "./index"

export const ModalContext = React.createContext<null | ContextValueType<unknown>>(null)

export const Provider = ({ children }: { children: React.ReactElement }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<unknown>(null)
  const [message, setMessage] = useState<string>("")

  const handlers = useRef<Handlers<unknown>>({})

  const open = (request: OpenRequest<unknown>) => {
    handlers.current = {
      onOk: request.onOk,
      onCancel: request.onCancel,
      onClose: request.onClose,
    }

    setData(request.data)
    setMessage(request.message)
    setIsOpen(true)
  }

  const internalHandlers = {
    onOk: () => {
      setIsOpen(false)
      setData(null)
      setMessage("")

      if (handlers.current.onOk) handlers.current.onOk(data)
    },
    onCancel: () => {
      setIsOpen(false)
      setData(null)
      setMessage("")

      if (handlers.current.onCancel) handlers.current.onCancel(data)
    },
    onClose: () => {
      setIsOpen(false)
      setData(null)
      setMessage("")

      if (handlers.current.onClose) handlers.current.onClose(data)
    },
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        data,
        message,
        internalHandlers,
        open,
      }}
    >
      {children}
      <div id="modal-target" />
      <Modal
        modal={{
          isOpen,
          data,
          message,
          internalHandlers,
          open,
        }}
      />
    </ModalContext.Provider>
  )
}
