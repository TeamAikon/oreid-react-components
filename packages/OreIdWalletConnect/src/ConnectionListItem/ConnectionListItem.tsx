import React, { useRef, useState } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'

import './ConnectionListItem.scss'
import { PeerMeta } from '../types'
import { ConnectionIcon } from '../ConnectionIcon'
import { ActiveSessionButton } from '../ActiveSessionButton'
import { OutlineButton } from '../OutlineButton'

interface ConnectionListItemProps {
  endSession: () => void
  disconnect: () => void
  startSession: () => void
  isActivedSession: boolean
  peerMeta: PeerMeta
}

export const ConnectionListItem: React.FC<ConnectionListItemProps> = ({
  endSession,
  disconnect,
  startSession,
  isActivedSession,
  peerMeta,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
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
        {isActivedSession ? (
          <ActiveSessionButton onClick={() => {}} fontColor="#000" />
        ) : (
          <OutlineButton onClick={startSession}>Start Session</OutlineButton>
        )}
      </div>
      <div className="oreIdWalletConnect-connectionListItem-menu">
        <button onClick={handleClick}>
          <MoreVert />
        </button>
        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
          <MenuItem onClick={endSession}>End Session</MenuItem>
          <MenuItem onClick={disconnect}>Disconnect</MenuItem>
        </Menu>
      </div>
    </div>
  )
}
