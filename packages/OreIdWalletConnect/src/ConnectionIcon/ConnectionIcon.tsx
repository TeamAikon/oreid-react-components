import React from 'react'

import './ConnectionIcon.scss'

interface ConnectionIconProps {
  icon: string
  size: number
}

export const ConnectionIcon: React.FC<ConnectionIconProps> = ({ icon, size }) => {
  return <img src={icon} className="oreIdWalletConnect-connectionIcon" style={{ width: size, height: size }} />
}
