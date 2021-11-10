import React from 'react'

import './ActiveSessionButton.scss'
import { OnSignal } from '../OnSignal'

interface ActiveSessionButtonProps {
  fontColor?: string
  onClick: () => void
}

export const ActiveSessionButton: React.FC<ActiveSessionButtonProps> = ({ onClick, fontColor = '#fff' }) => (
  <button className="oreIdWalletConnect-activeSessionButton-button" style={{ color: fontColor }} onClick={onClick}>
    <OnSignal /> <span>Active Session</span>
  </button>
)
