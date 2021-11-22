import React, { useEffect, useRef, useState } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import theme from '../assets/_styles/theme'

import { Modal } from '../Modal'
import { ConnectWalletContainer } from '../ConnectWalletContainer'
import {
  ModalConnections,
  OreIDWalletConnectProps,
  WalletConnectRefEvent,
  WalletConnectRef,
  PeerMeta,
  WalletConnectTransaction,
  Connection,
} from '../types'
import { factoryConnection, subscribeEvents, unsubscribeEvents } from '../utils'
import { ConnectionListItem } from '../ConnectionListItem'
import { ConnectionsBadge } from '../ConnectionsBadge'
import { mapWalletConnectRefToConnection } from '../mapper'
import { RequestWidget } from '../RequestWidget'
import { hasChainSupport } from '../helpers'

import './OreIDWalletConnect.scss'

const useForceUpdate = () => {
  const [value, setValue] = useState(0) // integer state
  return () => setValue(value + 1) // update the state to force render
}

export const OreIDWalletConnect: React.FC<OreIDWalletConnectProps> = ({
  config,
  modalConnections,
  setModalConnections,
  connections,
  setConnections,
  ...props
}) => {
  const walletConnectClientList = useRef<WalletConnectRef[]>([])
  const [incomingRequest, setIncomingRequest] = useState<
    { peerMeta: PeerMeta; request: WalletConnectTransaction } | undefined
  >()

  if (!config.clientIcons || !config.clientDescription || !config.clientName) {
    throw Error(`config missing at least one: clientIcons, clientDescription, clientName, clientUrl`)
  }

  const hasChainNetworkSupport = hasChainSupport(config?.chainNetwork)
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    if (modalConnections === ModalConnections.Closed) {
      setIncomingRequest(undefined)
    }
  }, [modalConnections])

  const getWalletConnectClientIndexByUri = (uri: string): number =>
    walletConnectClientList.current.findIndex((c) => c.connector.uri === uri)

  const getCurrentConnectionByUri = (uri: string): Connection | undefined => {
    const current = walletConnectClientList.current.find((c) => c.connector.uri === uri)
    if (current) {
      return mapWalletConnectRefToConnection(current)
    }
  }

  const updateConnections = () => setConnections(walletConnectClientList.current.map(mapWalletConnectRefToConnection))

  // This block is for customizing the events if necessary

  /** handle a new session request (a new wallet connect session to be approved) */
  const onSessionRequest: WalletConnectRefEvent = (connection, payload) => {
    if (props.onSessionRequest) {
      try {
        const currentConnection = getCurrentConnectionByUri(connection.connector.uri)
        props.onSessionRequest(currentConnection, payload)
      } catch (err) {
        props.onSessionRequest(undefined, payload)
      }
    }
  }

  /** Handle a new connection fron app */
  const onConnectionCreate: WalletConnectRefEvent = (connection, payload) => {
    if (props.onConnectionCreate) {
      try {
        const currentConnection = getCurrentConnectionByUri(connection.connector.uri)
        props.onConnectionCreate(currentConnection, payload)
      } catch (err) {
        props.onConnectionCreate(undefined, payload)
      }
    }
  }

  /** handle deleting a connection */
  const onConnectionDelete: WalletConnectRefEvent = (connection, payload) => {
    if (props.onConnectionDelete) {
      try {
        const currentConnection = getCurrentConnectionByUri(connection.connector.uri)
        props.onConnectionDelete(currentConnection, payload)
      } catch (err) {
        props.onConnectionDelete(undefined, payload)
      }
    }
    const index = getWalletConnectClientIndexByUri(connection.connector.uri)
    walletConnectClientList.current.splice(index, 1)
    updateConnections()
  }

  /** Handle a new connection from app */
  const onSessionUpdate: WalletConnectRefEvent = (connection, payload) => {
    if (props.onSessionUpdate) {
      try {
        const currentConnection = getCurrentConnectionByUri(connection.connector.uri)
        props.onSessionUpdate(currentConnection, payload)
      } catch (err) {
        props.onSessionUpdate(undefined, payload)
      }
    }
  }

  /** Handle a new request (for a transaction) */
  const onRequest: WalletConnectRefEvent = (connection, payload) => {
    const index = getWalletConnectClientIndexByUri(connection.connector.uri)
    const { peerMeta } = walletConnectClientList.current[index].connector.session
    if (walletConnectClientList.current[index].listening && !!peerMeta) {
      setIncomingRequest({
        peerMeta,
        request: payload,
      })
      setModalConnections(ModalConnections.OnRequest)
    }
  }

  /** Handle errors */
  const onError = (eventName: string, error: Error, connection: WalletConnectRef) => {
    if (props.onError) {
      const currentConnection = getCurrentConnectionByUri(connection.connector.uri)
      props.onError(eventName, error, currentConnection)
      try {
        props.onError(eventName, error, currentConnection)
      } catch (err) {
        props.onError(eventName, error)
      }
    }
  }
  // end of events block

  /** Handle starting listening to a session */
  const startSession = (uri: string) => {
    const index = getWalletConnectClientIndexByUri(uri)
    if (index === -1) return
    const connection = walletConnectClientList.current[index]
    connection.listening = true
    if (props.onStartListening) {
      props.onStartListening(mapWalletConnectRefToConnection(connection))
    }
    updateConnections()
  }

  /** Handle stopping listening to a session */
  const endSession = (uri: string) => {
    const index = getWalletConnectClientIndexByUri(uri)
    if (index === -1) return
    const connection = walletConnectClientList.current[index]
    connection.listening = false
    if (props.onStopListening) {
      props.onStopListening(mapWalletConnectRefToConnection(connection))
    }
    updateConnections()
  }

  /** Trigger disconnect (deletion) of this session from the wallet connect server - this will trigger a 'disconnect' event and call onConnectionDelete */
  const disconnect = (uri: string) => {
    const index = getWalletConnectClientIndexByUri(uri)
    if (index === -1) return
    const connection = walletConnectClientList.current[index]
    connection.connector.killSession()
  }

  const removeWalletConnectItem = (uri: string) => {
    const index = getWalletConnectClientIndexByUri(uri)
    if (index !== -1) {
      unsubscribeEvents(walletConnectClientList.current[index])
      walletConnectClientList.current.splice(index, 1)
    }
    updateConnections()
  }

  const createConnection = (walletConnectRef: WalletConnectRef) => {
    setModalConnections(ModalConnections.Closed)
    setConnections([...connections, mapWalletConnectRefToConnection(walletConnectRef)])
  }

  useEffect(() => {
    if (!hasChainNetworkSupport) return
    let update = false
    connections.forEach((propConnection) => {
      const index = getWalletConnectClientIndexByUri(propConnection.connectionUri)
      if (index === -1) {
        const connection = factoryConnection(propConnection.connectionUri, config, propConnection)
        subscribeEvents({
          connection,
          removeWalletConnectItem,
          onSessionUpdate,
          onRequest,
          onConnectionDelete,
          onError,
        })
        connection.listening = !!propConnection.listening
        walletConnectClientList.current.push(connection)
        update = true
      }
    })
    if (update) forceUpdate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connections, hasChainNetworkSupport])

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      walletConnectClientList.current.forEach(unsubscribeEvents)
    }
  }, [])

  if (!hasChainNetworkSupport) return null
  return (
    <MuiThemeProvider theme={theme}>
      <div className="oreIdWalletConnect">
        <Modal
          open={modalConnections !== ModalConnections.Closed}
          onClose={() => setModalConnections(ModalConnections.Closed)}
          header={modalConnections !== ModalConnections.OnRequest}
        >
          {modalConnections !== ModalConnections.OnRequest && (
            <div className="oreIdWalletConnect-modal-divider">
              <button
                className={`oreIdWalletConnect-modal-btn ${
                  modalConnections === ModalConnections.NewConnection ? 'oreIdWalletConnect-modal-btn-active' : ''
                }`}
                onClick={() => {
                  setModalConnections(ModalConnections.NewConnection)
                }}
              >
                New Connection
              </button>
              <button
                className={`oreIdWalletConnect-modal-btn ${
                  modalConnections === ModalConnections.ListConnections ? 'oreIdWalletConnect-modal-btn-active' : ''
                }`}
                onClick={() => {
                  setModalConnections(ModalConnections.ListConnections)
                }}
              >
                Connections
              </button>
            </div>
          )}
          {modalConnections === ModalConnections.NewConnection && (
            <ConnectWalletContainer
              config={config}
              createConnection={createConnection}
              onSessionRequest={onSessionRequest}
              onConnectionCreate={onConnectionCreate}
              onConnectionDelete={onConnectionDelete}
              onError={onError}
            />
          )}
          {modalConnections === ModalConnections.ListConnections && (
            <>
              {connections.map((connection) => {
                const index = getWalletConnectClientIndexByUri(connection.connectionUri)
                const meta = walletConnectClientList.current[index]?.connector?.session?.peerMeta
                if (!meta) return null
                return (
                  <React.Fragment key={connection.connectionUri}>
                    <ConnectionListItem
                      isActiveSession={!!connection.listening}
                      startSession={() => {
                        startSession(connection.connectionUri)
                      }}
                      disconnect={() => {
                        disconnect(connection.connectionUri)
                      }}
                      endSession={() => {
                        endSession(connection.connectionUri)
                      }}
                      peerMeta={meta}
                    />
                  </React.Fragment>
                )
              })}
            </>
          )}
          {modalConnections === ModalConnections.OnRequest && incomingRequest && (
            <RequestWidget
              {...incomingRequest}
              onAcceptRequest={(request) => {
                props.onAcceptRequest(request)
                setModalConnections(ModalConnections.Closed)
              }}
            />
          )}
        </Modal>
        <ConnectionsBadge
          isListening={connections.filter((connection) => connection.listening).length >= 1}
          peerMeta={connections
            .map((connection) => {
              const index = getWalletConnectClientIndexByUri(connection.connectionUri)
              return walletConnectClientList.current[index]?.connector.session.peerMeta as PeerMeta
            })
            .filter((peerMeta) => !!peerMeta)}
          onClick={() => {
            if (connections.length) {
              setModalConnections(ModalConnections.ListConnections)
            } else {
              setModalConnections(ModalConnections.NewConnection)
            }
          }}
        />
      </div>
    </MuiThemeProvider>
  )
}

export default OreIDWalletConnect
