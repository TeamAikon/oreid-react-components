import React, { useState } from 'react'
import { Button } from '../Button'
import { ConnectionIcon } from '../ConnectionIcon'
import { LongText } from '../LongText'
import { WalletConnectTransaction, PeerMeta } from '../types'

import './RequestWidget.scss'

interface ConnectWalletWidgetProps {
  peerMeta: PeerMeta
  request: WalletConnectTransaction
  onAcceptRequest: (request: WalletConnectTransaction) => void
}

export const RequestWidget: React.FC<ConnectWalletWidgetProps> = ({ peerMeta, request, onAcceptRequest }) => {
  if (!peerMeta) return null
  return (
    <div className="oreIdWalletConnect-requestWidget">
      <div className="oreIdWalletConnect-requestWidget-content">
        <h2>{peerMeta.name} is requesting you add signature(s) to a transaction.</h2>
        <p>Accept this request to add it to your pending transactions. You can then sign it using ORE Vault. </p>
      </div>

      <div className="oreIdWalletConnect-requestWidget-content">
        <h3>Account Address</h3>
        <span className="oreIdWalletConnect-requestWidget-accountAddress">
          <LongText truncateInMiddle text={request.params[0].from} />
        </span>
      </div>

      <div className="oreIdWalletConnect-requestWidget-divider" />

      <div className="oreIdWalletConnect-requestWidget-name">
        {peerMeta.icons && <ConnectionIcon icon={peerMeta.icons[peerMeta.icons.length - 1]} size={50} />}
        <span>{peerMeta.name}</span>
      </div>

      <Button onClick={() => onAcceptRequest(request)}>Accept</Button>
    </div>
  )
}
