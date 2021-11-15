import React, { useState } from 'react'
import { Button } from '../Button'
import { ConnectionIcon } from '../ConnectionIcon'
import { WalletConnectRequest, PeerMeta } from '../types'

import './RequestWidget.scss'

interface ConnectWalletWidgetProps {
  peerMeta: PeerMeta
  request: WalletConnectRequest
  onAcceptRequest: (request: WalletConnectRequest) => void
}

export const RequestWidget: React.FC<ConnectWalletWidgetProps> = ({ peerMeta, request, onAcceptRequest }) => {
  if (!peerMeta) return null
  return (
    <div className="oreIdWalletConnect-requestWidget">
      <div className="oreIdWalletConnect-requestWidget-content">
        <h2>{peerMeta.name} is requesting your Signature.</h2>
        <p>Accept this request to add it to your pending transactions. You can then sign it using ORE Vault. </p>
      </div>

      <div className="oreIdWalletConnect-requestWidget-content">
        <h3>Account Address</h3>
        <span className="oreIdWalletConnect-requestWidget-accountAddress">{request.params[0].from}</span>
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
