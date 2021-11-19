import React from 'react'
import './Loading.scss'

interface LoadingProps {
  backgroundColor?: string
  brandColor?: string
}

export const Loading: React.FC<LoadingProps> = ({ backgroundColor, brandColor }) => {
  const containerStyle: React.CSSProperties = {
    // backgroundColor: backgroundColor || defaultBackgroundColor,
    display: 'flex',
    minHeight: '40vh',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }
  return (
    <div style={containerStyle}>
      <div>
        <div
          style={{
            height: '40px',
            width: '40px',
            boxSizing: 'border-box',
            border: ' 3px solid rgba(0, 0, 0, 0.2)',
            borderTopColor: brandColor || 'rgba(235, 239, 242, 0.8)',
            borderRadius: '100%',
            animation: 'rotation 0.7s infinite linear',
          }}
        />
      </div>
    </div>
  )
}
