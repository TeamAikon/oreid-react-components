import React from 'react'
import { ButtonOutline } from '../ButtonOutline'
import { ConnectionIcon } from '../ConnectionIcon'

interface Props {
  onClick: () => void
  CustomButton?: React.FC<{ onClick: () => void }>
  hideWhenNoConnections?: boolean
}

export const ConnectButton: React.FC<Props> = ({ onClick, CustomButton, hideWhenNoConnections }) => {
  if (CustomButton) {
    return <CustomButton onClick={onClick} />
  }
  if (hideWhenNoConnections) {
    return null
  }
  return (
    <>
      <div className="oreIdWalletConnect-connectionsBadge-icons">
        <ConnectionIcon icon="https://example.walletconnect.org/favicon.ico" size={20} />
      </div>
      <ButtonOutline label="Connect" onClick={onClick} />
    </>
  )
}
