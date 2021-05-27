import * as React from "react"
import { useRef } from "react"
import { ContextValueType, Instance } from "./types"
import { Modal } from "./index"
import { generateRandomString } from "./utils"
import useForceUpdate from "hooks/useForceUpdate"

export const ModalContext = React.createContext<null | ContextValueType>(null)

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const { current: modals } = useRef(new Map())
  const forceUpdate = useForceUpdate()

  const push = (instance: Instance<unknown>): string => {
    const generatedId = generateRandomString()
    modals.set(generatedId, instance)

    forceUpdate()

    return generatedId
  }

  const set = (id: string, instance: Instance<unknown>): void => {
    modals.set(id, instance)
    forceUpdate()
  }

  const get = (id: string): Instance<unknown> => {
    return modals.get(id)
  }

  const _delete = (id: string): void => {
    modals.delete(id)
    forceUpdate()
  }

  const modalsEntries = []

  for (let modal of modals.entries()) modalsEntries.push(modal)

  return (
    <ModalContext.Provider
      value={{
        push,
        set,
        get,
        delete: _delete,
      }}
    >
      {children}
      <div id="modal-target">
        {modalsEntries.map(([id, modal]) => (
          <Modal key={id} {...modal} />
        ))}
      </div>
    </ModalContext.Provider>
  )
}
