import React from 'react'

type DefaultUIProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const DefaultUI = (props: DefaultUIProps) => {
  return (
    <div>
      <button
        style={{
          padding: 20,
          background: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: 5,
          display: 'flex',
          width: '100%',
          cursor: 'pointer',
          fontSize: 18,
        }}
        onClick={props.onClick}
      >
        Connect using WalletConnect
      </button>
    </div>
  )
}

export default DefaultUI
