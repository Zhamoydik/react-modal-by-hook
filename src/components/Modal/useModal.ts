import { useContext, useEffect, useState } from "react"
import { ModalContext } from "./Provider"
import { UseModalReturns, OpenRequest } from "./types"
import useForceUpdate from "hooks/useForceUpdate"

const useModal = (): UseModalReturns<unknown> => {
  const modals = useContext(ModalContext)

  const [id, setId] = useState<string | null>(null)

  const forceUpdate = useForceUpdate()

  const clearInstance = () => {
    if (id !== null && modals?.set)
      modals.set(id, {
        isOpen: false,
        internalHandlers: {
          onOk: () => {},
          onCancel: () => {},
          onClose: () => {},
        },
      })
  }

  const open = (request: OpenRequest<unknown>) => {
    const internalHandlers = {
      onOk: () => {
        clearInstance()

        if (request.onOk) request.onOk(request.data)
      },
      onCancel: () => {
        clearInstance()

        if (request.onCancel) request.onCancel(request.data)
      },
      onClose: () => {
        clearInstance()

        if (request.onClose) request.onClose(request.data)
      },
    }

    if (id !== null && modals?.set)
      modals?.set(id, {
        isOpen: true,
        data: request.data,
        message: request.message,
        internalHandlers: internalHandlers,
      })

    forceUpdate()
  }

  useEffect(() => {
    if (id === null && modals?.push) {
      const instanceId = modals?.push({
        isOpen: false,
        internalHandlers: { onOk: () => {}, onCancel: () => {}, onClose: () => {} },
      })
      setId(instanceId)
    }
  }, [id, modals])

  useEffect(() => {
    return () => {
      if (id !== null && modals?.delete) modals?.delete(id)
    }
  }, [id, modals])

  return { open }
}

export default useModal
