import React, { useRef, useState } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'

import './ConnectionListItem.scss'
import { PeerMeta } from '../types'
import { ConnectionIcon } from '../ConnectionIcon'
import { ActiveSessionButton } from '../ActiveSessionButton'
import { OutlineButton } from '../OutlineButton'

interface ConnectionListItemProps {
  disconnect: () => void
  resetConnection: () => void
  peerMeta: PeerMeta
}

export const ConnectionListItem: React.FC<ConnectionListItemProps> = ({ disconnect, resetConnection, peerMeta }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleResetConnectionClick = () => {
    setAnchorEl(null)
    resetConnection()
  }

  if (!peerMeta) return null
  return (
    <div className="oreIdWalletConnect-connectionListItem">
      {peerMeta.icons && (
        <div>
          <ConnectionIcon icon={peerMeta.icons[0]} size={40} />
        </div>
      )}
      <div>{peerMeta.name}</div>
      <div className="oreIdWalletConnect-connectionListItem-actions">
        <ActiveSessionButton onClick={() => {}} fontColor="#000" />
      </div>
      <div className="oreIdWalletConnect-connectionListItem-menu">
        <button onClick={handleClick}>
          <MoreVert />
        </button>
        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
          <MenuItem onClick={disconnect}>Forget Connection</MenuItem>
          <MenuItem onClick={handleResetConnectionClick}>Reset Connection</MenuItem>
        </Menu>
      </div>
    </div>
  )
}
