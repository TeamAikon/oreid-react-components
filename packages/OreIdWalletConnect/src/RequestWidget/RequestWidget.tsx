import React from 'react'
import { Button } from '../Button'
import { ConnectionIcon } from '../ConnectionIcon'
import { LongText } from '../LongText'
import { PeerMeta, WalletConnectActionRequest } from '../types'

import styles from './RequestWidget.module.scss'
import { getAddressFromRequest } from '../helpers'

interface ConnectWalletWidgetProps {
  peerMeta: PeerMeta
  request: WalletConnectActionRequest
  onAcceptRequest: (request: WalletConnectActionRequest) => void
}

export const RequestWidget: React.FC<ConnectWalletWidgetProps> = ({ peerMeta, request, onAcceptRequest }) => {
  if (!peerMeta) return null
  return (
    <div className={styles.requestWidget}>
      <div className={styles.content}>
        <h2>{peerMeta.name} is requesting you add signature(s) to a transaction.</h2>
        <p>Accept this request to add it to your pending transactions. You can then sign it using ORE Vault. </p>
      </div>

      <div className={styles.content}>
        <h3>Account Address</h3>
        <span className={styles.accountAddress}>
          <LongText truncateInMiddle text={getAddressFromRequest(request)} />
        </span>
      </div>

      <div className={styles.divider} />

      <div className={styles.name}>
        {peerMeta.icons && <ConnectionIcon icon={peerMeta.icons[peerMeta.icons.length - 1]} size={50} />}
        <span>{peerMeta.name}</span>
      </div>

      <Button onClick={() => onAcceptRequest(request)}>Accept</Button>
    </div>
  )
}
