import React from 'react'
import { ButtonOutline } from '../ButtonOutline'
import { ConnectionIcon } from '../ConnectionIcon'

interface Props {
  onClick: () => void
  CustomButton?: React.FC<{ onClick: () => void }>
}

export const ConnectButton: React.FC<Props> = ({ onClick, CustomButton }) => {
  if (CustomButton) {
    return <CustomButton onClick={onClick} />
  }
  return (
    <>
      <ConnectionIcon icon="https://example.walletconnect.org/favicon.ico" size={20} />
      <ButtonOutline label="Connect" onClick={onClick} />
    </>
  )
}
