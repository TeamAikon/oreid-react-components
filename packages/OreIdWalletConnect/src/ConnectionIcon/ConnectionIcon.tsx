import React from 'react'

import styles from './ConnectionIcon.module.scss'

interface ConnectionIconProps {
  icon: string
  size: number
  connections?: number
}

export const ConnectionIcon: React.FC<ConnectionIconProps> = ({ icon, size, connections }) => {
  return (
    <span className={styles.container}>
      <img src={icon} className={styles.connectionIcon} style={{ width: size, height: size }} />
      {connections && <span className={styles.connectionsNumber}>{connections}</span>}
    </span>
  )
}
