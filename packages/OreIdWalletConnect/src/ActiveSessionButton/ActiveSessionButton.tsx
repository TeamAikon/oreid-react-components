import classNames from 'classnames'
import React from 'react'
import { OnSignal } from '../OnSignal'
import { OreIDWalletConnectSize } from '../types'

import styles from './ActiveSessionButton.module.scss'

interface ActiveSessionButtonProps {
  fontColor?: string
  onClick: () => void
  parentSize: OreIDWalletConnectSize
}

export const ActiveSessionButton: React.FC<ActiveSessionButtonProps> = ({
  onClick,
  parentSize,
  fontColor = '#fff',
}) => {
  const complete = parentSize >= OreIDWalletConnectSize.Wide
  return (
    <button
      className={classNames(styles.button, {
        [styles.small]: !complete,
      })}
      style={{ color: fontColor }}
      onClick={onClick}
    >
      <OnSignal /> {complete && <span className={styles.text}>Active Session</span>}
    </button>
  )
}
