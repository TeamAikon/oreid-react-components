import React from 'react'

import './Button.scss'

interface ButtonProps {
  onClick: () => void
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  const cls = disabled ? 'disabled' : ''
  return (
    <button className={`oreIdWalletConnect-button ${cls}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
