import React from 'react'
import { PeerMeta } from '../types'

type ApproveSessionUIProps = {
  approveSessionRequest: React.MouseEventHandler<HTMLButtonElement>
  declineSessionRequest: React.MouseEventHandler<HTMLButtonElement>
  peerMeta: PeerMeta | any
}

const ApproveSessionUI = (props: ApproveSessionUIProps) => {
  const { peerMeta, approveSessionRequest, declineSessionRequest } = props

  return (
    <div>
      <h1>Are you sure you want to connect your wallet this Application?</h1>
      {peerMeta.icons && peerMeta.icons.length > 0 && (
        <img src={peerMeta.icons[peerMeta.icons.length - 1]} style={{ maxWidth: 200 }} />
      )}
      <p style={{ marginTop: 10 }}>Name: {peerMeta.name}</p>
      <p>Description: {peerMeta.description}</p>
      <p>
        URL:{' '}
        <a href={peerMeta.url} target="_blank">
          {peerMeta.url}
        </a>
      </p>
      <div style={{ marginTop: 20, display: 'flex' }}>
        <button
          style={{
            padding: 10,
            background: '#4caf50',
            color: '#fff',
            flex: 1,
            border: '1px solid #CCC',
            borderRadius: 5,
            cursor: 'pointer',
          }}
          onClick={approveSessionRequest}
        >
          Approve Request
        </button>
        <button
          style={{
            padding: 10,
            background: '#ff0000',
            color: '#fff',
            flex: 1,
            border: '1px solid #CCC',
            borderRadius: 5,
            cursor: 'pointer',
          }}
          onClick={declineSessionRequest}
        >
          Reject Request
        </button>
      </div>
    </div>
  )
}

export default ApproveSessionUI
