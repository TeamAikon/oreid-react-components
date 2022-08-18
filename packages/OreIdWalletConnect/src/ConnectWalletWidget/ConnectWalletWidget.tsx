import React, { useState } from 'react'
import { OutlinedInput } from '@material-ui/core'
import { QrCodeImage } from './QrCodeImage'
import { ArowIcon } from './ArowIcon'
import { Button } from '../Button'

import styles from './ConnectWalletWidget.module.scss'

interface ConnectWalletWidgetProps {
  onClickConect: (uir: string) => void
  errorMessage?: string
}

export const ConnectWalletWidget: React.FC<ConnectWalletWidgetProps> = ({ onClickConect, errorMessage }) => {
  const [uri, setUri] = useState('')
  return (
    <div className={styles.connectWalletWidget}>
      <div className={styles.content}>
        <p>WalletConnect is a new way to connect your ORE Vault Wallet to decentralized applications.</p>
        <a href="" target="_new">
          Learn More
        </a>
      </div>
      <div className={styles.example}>
        <div className={styles.code}>
          <div>
            <QrCodeImage size={90} />
          </div>
          <p>Copy to clipboard</p>
        </div>
        <div className={styles.content}>
          <ul>
            <li>1. Go to your app</li>
            <li>2. Connect to WalletConnect - copy code </li>
            <li>3. Paste the code here</li>
          </ul>
          <ArowIcon />
        </div>
      </div>

      <div className={styles.input}>
        <div className={styles.container}>
          <div>
            <QrCodeImage size={30} />
          </div>
          <OutlinedInput fullWidth value={uri} onChange={e => setUri(e.target.value)} />
        </div>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      </div>

      <Button onClick={() => onClickConect(uri)} disabled={!uri}>
        Continue
      </Button>
    </div>
  )
}
