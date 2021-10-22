import React, { useEffect, useState } from 'react'

// import types and helper methods
import { OreIDWalletConnectProps, AppConfig, ConnectedClients } from './types'
import {
  checkIfAlreadyConnected,
  findConnectedClientByUri,
  initializeExistingWalletConnectSessions,
  initializeNewWalletConnectSession,
  INITIAL_STATE,
  subscribeToLiveEvents,
  unsubscribeFromLiveEvents,
  updateWalletConnectState,
} from './helpers'

// import all UI components
import LoadingUI from './components/LoadingUI'
import DefaultUI from './components/DefaultUI'
import ConnectUI from './components/ConnectUI'
import ApproveSessionUI from './components/ApproveSessionUI'
import ConnectedUI from './components/ConnectedUI'
import ListeningUI from './components/ListeningUI'

/**
 * WalletConnect Client React Component
 * Use this component to connect to various WalletConnect supported applications
 * Handling signing/transaction requests should be managed by the parent app as these events will be passed via props
 */
const OreIDWalletConnect = (props: OreIDWalletConnectProps) => {
  // this will help us keep track of all the client apps we're connected to
  const [connectedClients, setConnectedClients] = useState<ConnectedClients>([])
  // app config for wallet connect state
  const [walletConnectState, setWalletConnectState] = useState<AppConfig>(INITIAL_STATE)
  // this will keep track of all pending requests
  const [pendingRequests, setPendingRequests] = useState<object[]>([])

  // methods from props we need access to
  const { activePage, activeSession, onWalletConnectButtonClick, onWalletConnectURIPaste } = props

  // This is executed only once, after the component is mounted/rendered in UI
  useEffect(() => {
    updateWalletConnectState(setWalletConnectState, props)
    initializeExistingWalletConnectSessions(
      props,
      connectedClients,
      setConnectedClients,
      setWalletConnectState,
      setPendingRequests,
    )
  }, [])

  // This is executed everytime the activeSession value changes and if the app is not already connected to that client/uri
  useEffect(() => {
    if (activeSession && !checkIfAlreadyConnected(connectedClients, activeSession)) {
      initializeNewWalletConnectSession(
        activeSession,
        props,
        connectedClients,
        setConnectedClients,
        setWalletConnectState,
        setPendingRequests,
      )
    }
  }, [activeSession])

  /** Disconnect from the WalletConnect session, aka terminate the session */
  const disconnectFromWalletConnect = () => {
    const connectedClient = findConnectedClientByUri(connectedClients, activeSession)
    const updatedClients = connectedClients.filter(client => client.uri !== activeSession)
    setConnectedClients([...updatedClients])
    connectedClient?.connector && connectedClient?.connector.killSession()
    props.onSessionDisconnect(activeSession)
  }

  /** Approves the current session request */
  const approveSessionRequest = () => {
    const connectedClient = findConnectedClientByUri(connectedClients, activeSession)
    const { chainId, address } = walletConnectState
    if (connectedClient?.connector) {
      connectedClient.connector.approveSession({
        chainId,
        accounts: [address],
      })
    }
  }

  /** Declines the current session request */
  const declineSessionRequest = () => {
    const connectedClient = findConnectedClientByUri(connectedClients, activeSession)
    if (connectedClient && connectedClient.uri) {
      const updatedClients = connectedClients.filter(client => client.uri !== connectedClient.uri)
      setConnectedClients([...updatedClients])
    }
    if (connectedClient?.connector) {
      connectedClient.connector.rejectSession()
    }
  }

  /** Changes the active client/app to the one selected by user and starts listening for requests */
  const changeActiveClient = (uri: string) => {
    props.onChangeActiveClient(uri)
    const client = findConnectedClientByUri(connectedClients, uri)
    const connector = client?.connector
    if (connector) {
      subscribeToLiveEvents(uri, connector, pendingRequests, setPendingRequests)
      props.setActivePage('listening')
    }
  }

  /** Display all the apps client is connected to */
  const showAllConnectedApps = () => {
    props.setActivePage('default')
    setPendingRequests([])
    const client = findConnectedClientByUri(connectedClients, activeSession)
    const connector = client?.connector
    if (connector) {
      unsubscribeFromLiveEvents(activeSession, connector)
    }
  }

  /**
   * Render different UI based on activePage prop
   */
  const connectedClient = findConnectedClientByUri(connectedClients, activeSession)

  if (activePage === 'default') {
    if (connectedClients && connectedClients.length > 0) {
      return (
        <div>
          <ConnectedUI connectedClients={connectedClients} onClick={changeActiveClient} />
          <br />
          <DefaultUI
            onClick={() => {
              onWalletConnectButtonClick(connectedClient?.connector)
            }}
          />
        </div>
      )
    } else {
      return (
        <DefaultUI
          onClick={() => {
            onWalletConnectButtonClick(connectedClient?.connector)
          }}
        />
      )
    }
  }

  if (activePage === 'listening') {
    return (
      <ListeningUI
        pendingRequests={pendingRequests}
        disconnectFromWalletConnect={disconnectFromWalletConnect}
        showAllConnectedApps={showAllConnectedApps}
      />
    )
  }

  if (activePage === 'connect') {
    return <ConnectUI setActivePage={props.setActivePage} onWalletConnectURIPaste={onWalletConnectURIPaste} />
  }
  if (activePage === 'approve_session') {
    return (
      <ApproveSessionUI
        peerMeta={connectedClient?.peerMeta}
        approveSessionRequest={approveSessionRequest}
        declineSessionRequest={declineSessionRequest}
      />
    )
  }

  if (activePage === 'loading') {
    return <LoadingUI />
  }

  if (activePage === 'error') {
    return <div>Error Occurred</div>
  }

  return (
    <div>
      <h3>activePage is not specified or is invalid.</h3>
      <br />
      <DefaultUI
        onClick={() => {
          onWalletConnectButtonClick(connectedClient?.connector)
        }}
      />
    </div>
  )
}

export default OreIDWalletConnect
