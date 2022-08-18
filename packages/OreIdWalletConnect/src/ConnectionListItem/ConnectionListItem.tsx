import { Menu, MenuItem } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import React from 'react'
import { ActiveSessionButton } from '../ActiveSessionButton'
import { ConnectionIcon } from '../ConnectionIcon'
import { OreIDWalletConnectSize, PeerMeta } from '../types'

import styles from './ConnectionListItem.module.scss'

interface ConnectionListItemProps {
  disconnect: () => void
  resetConnection: () => void
  peerMeta: PeerMeta
  parentSize: OreIDWalletConnectSize
}

export const ConnectionListItem: React.FC<ConnectionListItemProps> = ({
  disconnect,
  resetConnection,
  peerMeta,
  parentSize,
}) => {
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
    <div className={styles.connectionListItem}>
      {peerMeta.icons && (
        <div>
          <ConnectionIcon icon={peerMeta.icons[0]} size={40} />
        </div>
      )}
      <div>{peerMeta.name}</div>
      <div className={styles.actions}>
        <ActiveSessionButton onClick={() => {}} fontColor="#000" parentSize={parentSize} />
      </div>
      <div className={styles.menu}>
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
