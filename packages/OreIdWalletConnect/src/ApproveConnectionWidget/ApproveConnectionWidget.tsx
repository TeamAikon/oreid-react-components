import React from 'react'
import { Button } from '../Button'
import { ConnectionIcon } from '../ConnectionIcon'
import { PeerMeta } from '../types'

import styles from './ApproveConnectionWidget.module.scss'

interface ApproveConnectionWidgetProps {
  approveSessionRequest: () => void
  peerMeta: PeerMeta
  address: string
}

export const ApproveConnectionWidget: React.FC<ApproveConnectionWidgetProps> = ({
  approveSessionRequest,
  peerMeta,
  address,
}) => {
  return (
    <div className={styles.approveConnectionWidget}>
      <div className={styles.title}>Connected to {peerMeta.name}</div>

      {peerMeta.icons && (
        <div className={styles.name}>
          <div>
            <ConnectionIcon icon={peerMeta.icons[peerMeta.icons.length - 1]} size={74} />
          </div>
          <a href={peerMeta.url} target="_new">
            {peerMeta.name}
          </a>
        </div>
      )}

      <div className={styles.address}>
        <div className={styles.title}>Address</div>
        <span>{address}</span>
      </div>

      <div className={styles.description}>
        <div className={styles.title}>You've successfully connected to {peerMeta.name}.</div>
        <span>Please go back to the app to perform transactions. You will see any Wallet requests here.</span>
      </div>

      <Button onClick={() => approveSessionRequest()}>Done</Button>
    </div>
  )
}
