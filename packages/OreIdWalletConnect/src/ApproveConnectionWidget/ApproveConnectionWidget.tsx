import React, { useState } from 'react'
import { OutlinedInput } from '@material-ui/core'
import { QrCodeImage } from './QrCodeImage'
import { ArowIcon } from './ArowIcon'
import { Button } from '../Button'
import { PeerMeta } from '../types'
import { ConnectionIcon } from '../ConnectionIcon'

import './ApproveConnectionWidget.scss'

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
    <div className="oreIdWalletConnect-approveConnectionWidget">
      <div className="oreIdWalletConnect-approveConnectionWidget-title">Connected to {peerMeta.name}</div>

      {peerMeta.icons && (
        <div className="oreIdWalletConnect-approveConnectionWidget-name">
          <div>
            <ConnectionIcon icon={peerMeta.icons[peerMeta.icons.length - 1]} size={74} />
          </div>
          <a href={peerMeta.url} target="_new">
            {peerMeta.name}
          </a>
        </div>
      )}

      <div className="oreIdWalletConnect-approveConnectionWidget-address">
        <div className="oreIdWalletConnect-approveConnectionWidget-title">Address</div>
        <span>{address}</span>
      </div>

      <div className="oreIdWalletConnect-approveConnectionWidget-description">
        <div className="oreIdWalletConnect-approveConnectionWidget-title">
          You've successfully connected to {peerMeta.name}.
        </div>
        <span>Please go back to the app to perform transactions. You will see any Wallet requests here.</span>
      </div>

      <Button onClick={() => approveSessionRequest()}>Done</Button>
    </div>
  )
}
