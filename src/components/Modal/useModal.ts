import { useContext, useEffect, useState } from "react"
import { ModalContext } from "./Provider"
import { UseModalReturns, OpenRequest, Instance } from "./types"
import useForceUpdate from "hooks/useForceUpdate"

const useModal = (): UseModalReturns<unknown> => {
  const modals = useContext(ModalContext)

  const [id, setId] = useState<string | null>(null)

  const forceUpdate = useForceUpdate()

  const update = (instance: Partial<Instance<unknown>>) => {
    if (id !== null && modals) {
      const currentModal = modals.get(id)
      modals.set(id, {
        ...currentModal,
        ...instance,
      })
    }
  }

  const clear = () => {
    if (id !== null && modals?.set)
      modals.set(id, {
        isOpen: false,
        internalHandlers: {
          onOk: () => {},
          onCancel: () => {},
          onClose: () => {},
        },
        okInProgress: false,
      })
  }

  const open = (request: OpenRequest<unknown>) => {
    const internalHandlers = {
      onOk: () => {
        if (request.onOk) {
          const handlerReturns = request.onOk(request.data)
          if (!(handlerReturns instanceof Promise)) clear()
          else {
            update({ okInProgress: true })
            handlerReturns.then(clear).catch(() => {
              update({ okInProgress: false })
            })
          }
        } else clear()
      },
      onCancel: () => {
        clear()

        if (request.onCancel) request.onCancel(request.data)
      },
      onClose: () => {
        clear()

        if (request.onClose) request.onClose(request.data)
      },
    }

    if (id !== null && modals?.set)
      modals?.set(id, {
        isOpen: true,
        data: request.data,
        body: request.body,
        internalHandlers: internalHandlers,
        okInProgress: false,
      })

    forceUpdate()
  }

  useEffect(() => {
    if (id === null && modals?.push) {
      const instanceId = modals?.push({
        isOpen: false,
        internalHandlers: { onOk: () => {}, onCancel: () => {}, onClose: () => {} },
        okInProgress: false,
      })
      setId(instanceId)
    }
  }, [id, modals])

  return { open }
}

export default useModal
