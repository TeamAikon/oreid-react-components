import React, { FunctionComponent } from 'react'
import { Link } from '@material-ui/core'
import classNames from 'classnames'
import { CopyToClipboard } from '../CopyToClipboard'
import TruncateMiddle from './TruncateMiddle'

import './LongText.scss'

function isNullOrEmpty(obj) {
  if (!obj) {
    return true
  }
  if (obj === null) {
    return true
  }
  // Check for an empty array too
  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return true
    }
  }
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

interface LongTextProps {
  text: string
  className?: string
  href?: string
  truncateInMiddle?: boolean
  showCopy?: boolean
  onCopy?: () => void
  onClick?: () => void
}

export const LongText: FunctionComponent<LongTextProps> = (props) => {
  const { className, href, text, truncateInMiddle, showCopy, onCopy, onClick } = props
  return (
    <div className="oreIdWalletConnect-longText">
      <Link
        component={href ? 'a' : 'div'}
        underline={href ? 'hover' : 'none'}
        href={href || undefined}
        rel="noreferrer"
        target="_blank"
        variant="body1"
        className={classNames(className, {
          'oreIdWalletConnect-longText-link': true,
          'oreIdWalletConnect-longText-pointerCursor': !!href,
        })}
        onClick={onClick}
      >
        {truncateInMiddle ? (
          <TruncateMiddle>
            <span>{text}</span>
          </TruncateMiddle>
        ) : (
          text
        )}
      </Link>
      {showCopy && (
        <div className="oreIdWalletConnect-longText-copy" onClick={(e) => e.stopPropagation()}>
          <CopyToClipboard text={text} onCopy={onCopy} />
        </div>
      )}
    </div>
  )
}
