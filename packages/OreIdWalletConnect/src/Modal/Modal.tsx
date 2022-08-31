import { Button, Dialog as MuiDialog, DialogProps } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Close as CloseIcon } from '@material-ui/icons'
import React from 'react'
import theme from '../assets/_styles/theme'
import styles from './Modal.module.scss'
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
        paper: styles.modal,
      }}
    >
      {props.open && (
        <>
          {header && (
            <div className={styles.header}>
              <Button
                className={styles.btn}
                startIcon={<CloseIcon />}
                onClick={() => props.onClose && props.onClose({}, 'backdropClick')}
              >
                Cancel
              </Button>
              <div className={styles.img}>
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
