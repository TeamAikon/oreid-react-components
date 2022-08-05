import React from 'react'

import './ConnectionIcon.scss'

interface ConnectionIconProps {
  icon: string
  size: number
  connections?: number
}

export const ConnectionIcon: React.FC<ConnectionIconProps> = ({ icon, size, connections }) => {
  return (
    <span className="oreIdWalletConnect-connectionIcon-container-icon">
      <img src={icon} className="oreIdWalletConnect-connectionIcon" style={{ width: size, height: size }} />
      {connections && <span className="oreIdWalletConnect-connectionIcon-connections-number">{connections}</span>}
    </span>
  )
}
