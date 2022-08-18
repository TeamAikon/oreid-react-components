/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useCallback } from 'react'

import styles from './TruncateMiddle.module.scss'

const ellipse = (parentNode: HTMLElement, txtNode: HTMLElement) => {
  const containerWidth = parentNode.offsetWidth
  const txtWidth = txtNode.offsetWidth
  const targetWidth = txtWidth

  if (targetWidth > containerWidth) {
    const str = txtNode.textContent
    if (!str) return
    const txtChars = str.length
    const avgLetterSize = txtWidth / txtChars
    const canFit = (containerWidth - (targetWidth - txtWidth)) / avgLetterSize
    const delEachSide = (txtChars - canFit + 5) / 2
    const endLeft = Math.floor(txtChars / 2 - delEachSide)
    const startRight = Math.ceil(txtChars / 2 + delEachSide)
    txtNode.textContent = `${str.substr(0, endLeft)}...${str.substr(startRight)}`
  }
}

const prepEllipse = (node: HTMLElement) => {
  const parent = node.parentElement
  const txtToEllipse = node.firstElementChild as HTMLElement

  if (txtToEllipse) {
    // @ts-ignore
    ellipse(node.offsetWidth > parent.offsetWidth ? parent : node, txtToEllipse)
  }
}

const TruncateMiddle: FunctionComponent<{}> = props => {
  const measuredParent = useCallback(node => {
    if (node !== null) {
      window.addEventListener('resize', () => {
        prepEllipse(node)
      })
      prepEllipse(node)
    }
    // @ts-ignore
  }, null)

  return (
    <div ref={measuredParent} className={styles.truncateMiddle}>
      {props.children}
    </div>
  )
}

export default TruncateMiddle
