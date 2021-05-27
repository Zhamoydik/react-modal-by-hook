import React from "react"

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
  data?: T
  body?: React.ReactNode
  internalHandlers: InternalHandlers
}

export type UseModalReturns<T> = { open: (request: OpenRequest<T>) => void }

export type ModalProps<T> = Instance<T> & { open: (request: OpenRequest<T>) => void }

export type ContextValueType = {
  push: (instance: Instance<unknown>) => string
  set: (id: string, instance: Instance<unknown>) => void
  get: (id: string) => Instance<unknown>
  delete: (id: string) => void
}

export type OpenRequest<T> = {
  data: T
  body: React.ReactNode
} & Handlers<T>
