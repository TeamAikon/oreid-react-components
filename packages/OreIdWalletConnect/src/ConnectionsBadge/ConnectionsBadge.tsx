import React from 'react'
import { PeerMeta } from '../types'
import { ConnectionIcon } from '../ConnectionIcon'
import { ActiveSessionButton } from '../ActiveSessionButton'
import { ButtonOutline } from '../ButtonOutline'

import './ConnectionsBadge.scss'

interface ConnectedUIProps {
  hideWhenNoConnections: boolean
  peerMeta: PeerMeta[]
  onClick: () => void
}

export const ConnectionsBadge: React.FC<ConnectedUIProps> = ({ hideWhenNoConnections, peerMeta, onClick }) => {
  if (hideWhenNoConnections && peerMeta.length === 0) {
    return null
  }
  return (
    <div className="oreIdWalletConnect-connectionsBadge">
      <div className="oreIdWalletConnect-connectionsBadge-icons">
        {peerMeta.map((metaData, index) => {
          if (!metaData?.icons?.[0]) return null
          return <ConnectionIcon key={index} icon={metaData.icons[0]} size={20} />
        })}
        {peerMeta.length === 0 && <ConnectionIcon icon="https://example.walletconnect.org/favicon.ico" size={20} />}
      </div>
      {peerMeta.length > 0 ? (
        <ActiveSessionButton onClick={onClick} />
      ) : (
        <>
          <ButtonOutline label="Connect" onClick={onClick} />
        </>
      )}
    </div>
  )
}
