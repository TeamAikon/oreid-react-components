import classNames from 'classnames'
import React from 'react'

import styles from './Button.module.scss'

interface ButtonProps {
  onClick: () => void
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <button
      className={classNames(styles.button, { [styles.disabled]: disabled })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
