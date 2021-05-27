import React from "react"
import s from "./index.module.css"

type ButtonOwnProps = { children: React.ReactNode }

type ButtonProps<E extends React.ElementType> = ButtonOwnProps & Omit<React.ComponentProps<E>, keyof ButtonOwnProps>

const Button = ({ children, ...rest }: ButtonProps<React.ElementType>) => (
  <button className={s.button} {...rest}>
    {children}
  </button>
)

export default Button
