export type Handlers<T> = {
  onOk?: (data: T) => Promise<unknown>
  onCancel?: (data: T) => Promise<unknown>
  onClose?: (data: T) => Promise<unknown>
}

export type InternalHandlers = {
  onOk: () => void
  onCancel: () => void
  onClose: () => void
}

export type Instance<T> = {
  isOpen: boolean
  data: T
  message: string
  internalHandlers: InternalHandlers
  open: (request: OpenRequest<T>) => void
}

export type ContextValueType<T> = Instance<T>

export type Props<T> = {
  modal: Instance<T>
}

export type OpenRequest<T> = {
  data: T
  message: string
} & Handlers<T>
