import classNames from 'classnames'
import React from 'react'
import { OnSignal } from '../OnSignal'
import { OreIDWalletConnectSize } from '../types'

import './ActiveSessionButton.scss'

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
      className={classNames('oreIdWalletConnect-activeSessionButton-button', {
        'oreIdWalletConnect-activeSessionButton-button-small': !complete,
      })}
      style={{ color: fontColor }}
      onClick={onClick}
    >
      <OnSignal /> {complete && <span>Active Session</span>}
    </button>
  )
}
