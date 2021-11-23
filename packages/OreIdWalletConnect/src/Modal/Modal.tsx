import React from 'react'
import { Button, Dialog as MuiDialog, DialogProps } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import theme from '../assets/_styles/theme'

import './Modal.scss'
import { ModalHeaderIcon } from './ModalHeaderIcon'

interface ModalProps extends DialogProps {
  header?: boolean
}

export const Modal: React.FC<ModalProps> = ({ children, header, ...props }) => {
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <MuiDialog
      fullScreen={fullScreen}
      fullWidth={false}
      {...props}
      classes={{
        root: 'root',
        paper: 'oreIdWalletConnect-modal-paper',
      }}
    >
      {props.open && (
        <>
          {header && (
            <div className="oreIdWalletConnect-modal-paper-header">
              <Button
                className="oreIdWalletConnect-modal-paper-header-btn"
                startIcon={<CloseIcon />}
                onClick={() => props.onClose && props.onClose({}, 'backdropClick')}
              >
                Cancel
              </Button>
              <div className="oreIdWalletConnect-modal-paper-header-img">
                <ModalHeaderIcon />
              </div>
            </div>
          )}
          {children}
        </>
      )}
    </MuiDialog>
  )
}
