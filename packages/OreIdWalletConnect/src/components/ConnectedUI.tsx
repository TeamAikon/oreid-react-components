import React from 'react'
import { ConnectedClients } from '../types'

type ConnectedUIProps = {
  connectedClients: ConnectedClients
  onClick: Function
}

const buttonStyles = {
  padding: 20,
  background: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  display: 'flex',
  width: '100%',
  cursor: 'pointer',
  fontSize: 18,
  marginBottom: 5,
}

const ConnectedUI = (props: ConnectedUIProps) => {
  const { connectedClients, onClick } = props

  return (
    <div>
      {connectedClients &&
        connectedClients.map(client => {
          const { peerMeta } = client
          return (
            <button
              key={client.uri}
              style={buttonStyles}
              onClick={() => {
                onClick(client.uri)
              }}
            >
              <span>
                {peerMeta?.icons && <img src={peerMeta.icons[peerMeta?.icons.length - 1]} style={{ maxWidth: 32 }} />}
                Connected to {peerMeta?.name}
              </span>
            </button>
          )
        })}
    </div>
  )
}

export default ConnectedUI
