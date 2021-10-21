import React from 'react'

type ListeningUIProps = {
  pendingRequests: any
  disconnectFromWalletConnect: React.MouseEventHandler<HTMLButtonElement>
  showAllConnectedApps: React.MouseEventHandler<HTMLButtonElement>
}

const ListeningUI = (props: ListeningUIProps) => {
  const { pendingRequests, disconnectFromWalletConnect, showAllConnectedApps } = props
  return (
    <div>
      <h2>Listening for incoming requests</h2>
      <p>Please go to the app to sign string and transactions!</p>
      <div
        style={{
          marginTop: 20,
          padding: 10,
          border: '1px solid #ccc',
          wordBreak: 'break-all',
        }}
      >
        <div>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(pendingRequests, null, 2)}</pre>
        </div>
      </div>
      <div style={{ marginTop: 20, background: '#CCC', padding: 20 }}>
        <button onClick={disconnectFromWalletConnect} style={{ padding: 10, marginRight: 5 }}>
          Disconnect
        </button>
        <button onClick={showAllConnectedApps} style={{ padding: 10, marginRight: 5 }}>
          Show All Applications
        </button>
      </div>
    </div>
  )
}

export default ListeningUI
