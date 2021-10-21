# ORE ID WalletConnect Client

## Usage

Import component with: `import OreIdWalletConnect from 'oreid-walletconnect-client'`o

```
  <OreIDWalletConnect
    config={walletConnectConfig}
    connectUris={connectUris}
    activeSession={activeSession}
    sessions={existingWalletConnectSessions}
    activePage={activePage}
    setActivePage={setActivePage}
    onWalletConnectButtonClick={onWalletConnectButtonClick}
    onWalletConnectURIPaste={handleWalletConnectURIPaste}
    onSessionRequest={handleSessionRequest}
    onChangeActiveClient={handleChangeActiveClient}
    onSessionUpdate={handleSessionUpdate}
    onSessionDisconnect={handleSessionDisconnect}
    onTransaction={handleTransaction}
    onPersonalSign={handlePersonalSign}
    onConnect={handleConnect}
    onError={handleError}
  />

```

Look at the sample file `./src/OreIDWalletConnect.stories.js` for reference on using the Component.
