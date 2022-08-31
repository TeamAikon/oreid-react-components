import React from 'react'
import { ActiveSessionButton } from '../ActiveSessionButton'
import { ConnectButton } from '../ConnectButton'
import { OreIDWalletConnectSize, PeerMeta } from '../types'
import { ConnectionIconList } from './ConnectionIconList'

import styles from './ConnectionsBadge.module.scss'

interface Props {
  parentSize: OreIDWalletConnectSize
  hideWhenNoConnections: boolean
  peerMeta: PeerMeta[]
  onClick: () => void
  CustomButton?: React.FC<{ onClick: () => void }>
}

export const ConnectionsBadge: React.FC<Props> = ({
  hideWhenNoConnections,
  peerMeta,
  onClick,
  CustomButton,
  parentSize,
}) => {
  return (
    <div className={styles.connectionsBadge}>
      <div className={styles.icons}>
        <ConnectionIconList
          icons={peerMeta
            .map(metaData => {
              if (!metaData?.icons?.[0]) return ''
              return metaData?.icons[0]
            })
            .filter(icon => icon !== '')}
          parentSize={parentSize}
        />
      </div>
      {peerMeta.length > 0 ? (
        <ActiveSessionButton onClick={onClick} parentSize={parentSize} />
      ) : (
        <ConnectButton hideWhenNoConnections={hideWhenNoConnections} CustomButton={CustomButton} onClick={onClick} />
      )}
    </div>
  )
}
