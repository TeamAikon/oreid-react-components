import React from 'react'
import { Dialog as MuiDialog, DialogProps } from '@material-ui/core'
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
              <button onClick={() => props.onClose && props.onClose({}, 'backdropClick')}>X Close</button>
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
