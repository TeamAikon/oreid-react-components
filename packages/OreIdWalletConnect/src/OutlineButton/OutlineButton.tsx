import React from 'react'

import './OutlineButton.scss'

interface ButtonProps {
  onClick: () => void
  disabled?: boolean
}

export const OutlineButton: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <button className="oreIdWalletConnect-outlineButton" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
