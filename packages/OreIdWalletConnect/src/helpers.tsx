import WalletConnect from '@walletconnect/client'
import { AppConfig, ConnectedClient, ConnectedClients, OreIDWalletConnectProps, WalletConnectClient } from './types'

/** Initial state for AppConfig */
export const INITIAL_STATE: AppConfig = {
  peerMeta: {
    description: '',
    url: '',
    icons: [],
    name: '',
    ssl: false,
  },
  chainId: 1,
  accounts: [],
  address: '',
}

/** Set the updated WalletConnect config received from props */
export function updateWalletConnectState(setWalletConnectState: Function, props: OreIDWalletConnectProps) {
  setWalletConnectState(props.config)
}

/** Checks if user has any existing WalletConnect sessions, if yes this method loads those sessions */
export function initializeExistingWalletConnectSessions(
  props: OreIDWalletConnectProps,
  connectedClients: ConnectedClients,
  setConnectedClients: Function,
  setWalletConnectState: Function,
  setPendingRequests: Function,
) {
  const { sessions } = props
  try {
    if (sessions) {
      sessions.map(session => {
        const storageId = session.uri.split('key=')[1]
        const connector = new WalletConnect({ session, storageId })

        setConnectedClients((existingState: any) => [
          ...existingState,
          {
            uri: session.uri,
            connector,
            peerMeta: session.peerMeta,
          },
        ])

        subscribeToBasicEvents(
          session.uri,
          connector,
          props,
          connectedClients,
          setConnectedClients,
          setWalletConnectState,
          setPendingRequests,
        )
      })
    }
  } catch (e) {
    console.log('initializeExistingWalletConnectSessions error', e)
    props.onError(e)
  }
}

/** Initializes a new WalletConnect session */
export async function initializeNewWalletConnectSession(
  uri: string,
  props: OreIDWalletConnectProps,
  connectedClients: ConnectedClients,
  setConnectedClients: Function,
  setWalletConnectState: Function,
  setPendingRequests: Function,
) {
  try {
    const storageId = uri.split('key=')[1]
    const connector = new WalletConnect({ uri, storageId })
    if (!connector.connected) {
      await connector.createSession()
      setConnectedClients([...connectedClients, { uri: uri, connector }])
      subscribeToBasicEvents(
        uri,
        connector,
        props,
        connectedClients,
        setConnectedClients,
        setWalletConnectState,
        setPendingRequests,
      )
    }
  } catch (e) {
    console.log('initializeWalletConnectSession error', e)
    props.onError(e)
  }
}

/** Checks if a WalletConnect client is already connected or not based on its URI */
export function checkIfAlreadyConnected(connectedClients: ConnectedClients, uri: string) {
  const existing = findConnectedClientByUri(connectedClients, uri)
  if (existing && existing.uri) {
    return true
  }
  return false
}

/** Returns WalletConnect connected app based on its URI */
export function findConnectedClientByUri(connectedClients: ConnectedClients, clientUri: string) {
  return connectedClients.find(item => item.uri === clientUri)
}

/** Updates WalletConnect connected client details based on its URI */
export function updateConnectedClientByUri(
  uri: string,
  data: any,
  connectedClients: ConnectedClients,
  setConnectedClients: Function,
) {
  const currentClient = findConnectedClientByUri(connectedClients, uri)
  const allClientsExceptCurrent = connectedClients.filter(item => item.uri !== uri)
  setConnectedClients([...allClientsExceptCurrent, { ...currentClient, uri, ...data }])
}

/**
 * Subscribes to all basic events for a given client
 * Events: session_request, session_update, connect & disconnect
 */
export function subscribeToBasicEvents(
  uri: string,
  walletConnectClient: WalletConnectClient,
  props: OreIDWalletConnectProps,
  connectedClients: ConnectedClients,
  setConnectedClients: Function,
  setWalletConnectState: Function,
  setPendingRequests: Function,
) {
  const connector = walletConnectClient
  if (connector) {
    connector.on('session_request', (error, payload) => {
      if (error) {
        throw error
      }
      const peerMeta = payload.params[0].peerMeta
      updateConnectedClientByUri(uri, { peerMeta, connector }, connectedClients, setConnectedClients)
      props.onSessionRequest(connector, payload)
    })

    connector.on('session_update', (error, payload) => {
      if (error) {
        throw error
      }
      props.onSessionUpdate(connector, payload)
    })

    connector.on('connect', (error, payload) => {
      if (error) {
        throw error
      }
      props.onConnect(payload, connector)
    })

    connector.on('disconnect', (error, payload) => {
      if (error) {
        throw error
      }
      // reset the entire app
      resetAppState(setWalletConnectState, setPendingRequests)
      props.onSessionDisconnect(payload)
    })
  }
}

/**
 * Subscribes to live events for a given client
 * Events: call_request
 * More events can be added here if they're useful for connected clients
 */
export function subscribeToLiveEvents(
  uri: string,
  walletConnectClient: WalletConnectClient,
  pendingRequests: object[],
  setPendingRequests: Function,
) {
  const connector = walletConnectClient
  if (connector) {
    connector.on('call_request', async (error, payload) => {
      if (error) {
        throw error
      }
      const request = { ...payload, uri }
      const updatedPendingRequests = [...pendingRequests, request]
      setPendingRequests(updatedPendingRequests)
    })
  }
}

/**
 * Unsubscribes from live events for a given client
 * Events: call_request
 * All the events we're listening for in subscribeToLiveEvents method should be unsubscribed here
 */
export function unsubscribeFromLiveEvents(uri: string, walletConnectClient: WalletConnectClient) {
  const connector = walletConnectClient
  if (connector) {
    connector.off('call_request')
  }
}

/** This method resets the entire Application state for WalletConnect */
export function resetAppState(setWalletConnectState: Function, setPendingRequests: Function) {
  setWalletConnectState(INITIAL_STATE)
  setPendingRequests([{}])
}
