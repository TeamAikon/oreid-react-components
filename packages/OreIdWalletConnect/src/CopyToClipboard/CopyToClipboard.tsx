import { Tooltip } from '@material-ui/core'
import classNames from 'classnames'
import React, { FunctionComponent, useState } from 'react'
import {
  CopyToClipboard as CopyToClipboardComponent,
  Props as CopyToClipboardComponentProps,
} from 'react-copy-to-clipboard'

import styles from './CopyToClipboard.module.scss'

interface Props extends CopyToClipboardComponentProps {
  className?: string
  onCopy?: () => void
}

export const CopyToClipboard: FunctionComponent<Props> = props => {
  const { children, className, onCopy, ...other } = props
  const [copied, setCopied] = useState(false)
  return (
    <CopyToClipboardComponent
      {...other}
      onCopy={() => {
        setCopied(true)
        if (onCopy) onCopy()
      }}
    >
      <Tooltip open={copied} title="Copied!" placement="top">
        <div
          onAnimationEnd={() => setCopied(false)}
          className={classNames(className, {
            [styles.copyToClipboard]: true,
            [styles.copied]: copied,
          })}
        >
          {children}
        </div>
      </Tooltip>
    </CopyToClipboardComponent>
  )
}
