import React from 'react'

import styles from './OutlineButton.module.scss'

interface ButtonProps {
  onClick: () => void
  disabled?: boolean
}

export const OutlineButton: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
