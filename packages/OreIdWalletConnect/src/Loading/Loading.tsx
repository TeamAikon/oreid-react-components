import React from 'react'
import styles from './Loading.module.scss'

interface LoadingProps {
  brandColor?: string
}

export const Loading: React.FC<LoadingProps> = ({ brandColor }) => {
  return (
    <div className={styles.loading}>
      <div className={styles.spin} style={{ borderTopColor: brandColor || 'rgba(235, 239, 242, 0.8)' }} />
    </div>
  )
}
