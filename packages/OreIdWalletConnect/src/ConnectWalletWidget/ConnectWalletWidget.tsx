import React, { useState } from 'react'
import { OutlinedInput } from '@material-ui/core'
import { QrCodeImage } from './QrCodeImage'
import { ArowIcon } from './ArowIcon'
import { Button } from '../Button'

import './ConnectWalletWidget.scss'

interface ConnectWalletWidgetProps {
  onClickConect: (uir: string) => void
  errorMessage?: string
}

export const ConnectWalletWidget: React.FC<ConnectWalletWidgetProps> = ({ onClickConect, errorMessage }) => {
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
          <ul>
            <li>1. Go to your app</li>
            <li>2. Connect to WalletConnect - copy code </li>
            <li>3. Paste the code here</li>
          </ul>
          <ArowIcon />
        </div>
      </div>

      <div className="oreIdWalletConnect-connectWalletWidget-input">
        <div className="oreIdWalletConnect-connectWalletWidget-input-container">
          <div>
            <QrCodeImage size={30} />
          </div>
          <OutlinedInput fullWidth value={uri} onChange={(e) => setUri(e.target.value)} />
        </div>
        {errorMessage && <div className="oreIdWalletConnect-connectWalletWidget-error">{errorMessage}</div>}
      </div>

      <Button onClick={() => onClickConect(uri)} disabled={!uri}>
        Continue
      </Button>
    </div>
  )
}
