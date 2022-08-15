import React from 'react'
import { ConnectionIcon } from '../ConnectionIcon'
import { OreIDWalletConnectSize } from '../types'

interface Props {
  parentSize: OreIDWalletConnectSize
  icons: string[]
}

export const ConnectionIconList: React.FC<Props> = ({ icons, parentSize }) => {
  if (icons.length === 0) {
    return null
  }
  const numberOfConnections = icons.length
  const showIcons = parentSize > OreIDWalletConnectSize.Small ? 4 : 1
  const list = icons.slice(0, showIcons)
  const lastIcon = list.length - 1

  return (
    <>
      {list.map((icon, index) => (
        <ConnectionIcon
          key={icon}
          icon={icon}
          size={20}
          connections={index === lastIcon && list.length < numberOfConnections ? numberOfConnections : undefined}
        />
      ))}
    </>
  )
}
