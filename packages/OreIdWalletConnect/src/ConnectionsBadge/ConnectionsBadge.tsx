import React from 'react'
import { PeerMeta } from '../types'
import { ConnectionIcon } from '../ConnectionIcon'
import { ActiveSessionButton } from '../ActiveSessionButton'
import { ButtonOutline } from '../ButtonOutline'

import './ConnectionsBadge.scss'

interface ConnectedUIProps {
  isListening: boolean
  peerMeta: PeerMeta[]
  onClick: () => void
}

export const ConnectionsBadge: React.FC<ConnectedUIProps> = ({ isListening, peerMeta, onClick }) => {
  return (
    <div className="oreIdWalletConnect-connectionsBadge">
      <div className="oreIdWalletConnect-connectionsBadge-icons">
        {peerMeta.map((metaData) => {
          if (!metaData?.icons?.[0]) return null
          return <ConnectionIcon key={metaData.url} icon={metaData.icons[0]} size={20} />
        })}
      </div>
      {isListening ? <ActiveSessionButton onClick={onClick} /> : <ButtonOutline label="Connect" onClick={onClick} />}
    </div>
  )
}
