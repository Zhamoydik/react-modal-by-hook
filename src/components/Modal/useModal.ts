import { useContext } from "react"
import { ModalContext } from "./Provider"
import { Instance } from "./types"

const useModal = (): Instance<unknown> => {
  const context = useContext(ModalContext)

  return {
    isOpen: context?.isOpen ?? false,
    data: context?.data ?? null,
    message: context?.message ?? "",
    internalHandlers: context?.internalHandlers ?? { onOk: () => {}, onCancel: () => {}, onClose: () => {} },
    open: context?.open ?? (() => {}),
  }
}

export default useModal
