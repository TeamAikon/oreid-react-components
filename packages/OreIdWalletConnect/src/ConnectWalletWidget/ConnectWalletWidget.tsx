import React, { useState } from 'react'
import { OutlinedInput } from '@material-ui/core'
import { QrCodeImage } from './QrCodeImage'
import { ArowIcon } from './ArowIcon'
import { Button } from '../Button'

import './ConnectWalletWidget.scss'

interface ConnectWalletWidgetProps {
  onClickConect: (uir: string) => void
}

export const ConnectWalletWidget: React.FC<ConnectWalletWidgetProps> = ({ onClickConect }) => {
  const [uri, setUri] = useState('')
  return (
    <div className="oreIdWalletConnect-connectWalletWidget">
      <div className="oreIdWalletConnect-connectWalletWidget-content">
        <p>WalletConnect is a new way to connect your ORE Vault Wallet to decentralized applications.</p>
        <a href="" target="_new">
          Learn More
        </a>
      </div>
      <div className="oreIdWalletConnect-connectWalletWidget-example">
        <div className="oreIdWalletConnect-connectWalletWidget-example-code">
          <div>
            <QrCodeImage size={90} />
          </div>
          <p>Copy to clipboard</p>
        </div>
        <div className="oreIdWalletConnect-connectWalletWidget-example-content">
          <p>To connect with an app, copy the code provided by Wallet connect and paste it below</p>
          <ArowIcon />
        </div>
      </div>

      <div className="oreIdWalletConnect-connectWalletWidget-input">
        <div>
          <QrCodeImage size={30} />
        </div>
        <OutlinedInput fullWidth value={uri} onChange={(e) => setUri(e.target.value)} />
      </div>

      <Button onClick={() => onClickConect(uri)} disabled={!uri}>
        Continue
      </Button>
    </div>
  )
}
