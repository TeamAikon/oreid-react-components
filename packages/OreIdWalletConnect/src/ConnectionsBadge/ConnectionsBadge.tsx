import React from 'react'
import { IWalletConnectSession } from '@walletconnect/types'
import { ConnectionIcon } from '../ConnectionIcon'
import { ActiveSessionButton } from '../ActiveSessionButton'

import './ConnectionsBadge.scss'

interface ConnectedUIProps {
  sessions: IWalletConnectSession[]
  onClick: () => void
}

export const ConnectionsBadge: React.FC<ConnectedUIProps> = ({ sessions, onClick }) => {
  if (sessions.length === 0) return null
  return (
    <div className="oreIdWalletConnect-connectionsBadge">
      <div className="oreIdWalletConnect-connectionsBadge-icons">
        {sessions.map(({ peerMeta }, key) => {
          if (!peerMeta?.icons?.[0]) return null
          return <ConnectionIcon key={key} icon={peerMeta.icons[0]} size={20} />
        })}
      </div>
      <ActiveSessionButton onClick={onClick} />
    </div>
  )
}
