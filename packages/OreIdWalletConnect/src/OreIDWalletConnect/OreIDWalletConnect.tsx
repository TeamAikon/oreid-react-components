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
  WalletConnectRequest,
} from '../types'
import { factoryConnection, subscribeEvents, unsubscribeEvents } from '../utils'
import { ConnectionListItem } from '../ConnectionListItem'
import { ConnectionsBadge } from '../ConnectionsBadge'
import { mapWalletConnectRefToConnection } from '../mapper'
import { RequestWidget } from '../RequestWidget'

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
    { peerMeta: PeerMeta; request: WalletConnectRequest } | undefined
  >()

  const forceUpdate = useForceUpdate()

  useEffect(() => {
    if (modalConnections === ModalConnections.Closed) {
      setIncomingRequest(undefined)
    }
  }, [modalConnections])

  const getWalletConnectClientIndexByUri = (uri: string): number =>
    walletConnectClientList.current.findIndex((c) => c.connector.uri === uri)

  const updateConnections = () => setConnections(walletConnectClientList.current.map(mapWalletConnectRefToConnection))

  // This block is for customizing the events if necessary
  const onSessionRequest: WalletConnectRefEvent = (connection, payload) => {
    if (props.onSessionRequest) {
      try {
        props.onSessionRequest(mapWalletConnectRefToConnection(connection), payload)
      } catch (err) {
        props.onSessionRequest(undefined, payload)
      }
    }
  }
  const onConnect: WalletConnectRefEvent = (connection, payload) => {
    if (props.onConnect) {
      try {
        props.onConnect(mapWalletConnectRefToConnection(connection), payload)
      } catch (err) {
        props.onConnect(undefined, payload)
      }
    }
  }

  const onSessionUpdate: WalletConnectRefEvent = (connection, payload) => {
    if (props.onSessionUpdate) {
      try {
        props.onSessionUpdate(mapWalletConnectRefToConnection(connection), payload)
      } catch (err) {
        props.onSessionUpdate(undefined, payload)
      }
    }
  }
  const onRequest: WalletConnectRefEvent = (connection, payload) => {
    const index = getWalletConnectClientIndexByUri(connection.connector.uri)
    const { peerMeta } = walletConnectClientList.current[index].connector.session
    console.log('IF: ', walletConnectClientList.current[index].listening && !!peerMeta)
    if (walletConnectClientList.current[index].listening && !!peerMeta) {
      setIncomingRequest({
        peerMeta,
        request: payload,
      })
      setModalConnections(ModalConnections.OnRequest)
    }
  }
  const onDisconnect: WalletConnectRefEvent = (connection, payload) => {
    if (props.onDisconnect) {
      try {
        props.onDisconnect(mapWalletConnectRefToConnection(connection), payload)
      } catch (err) {
        props.onDisconnect(undefined, payload)
      }
    }
    const index = getWalletConnectClientIndexByUri(connection.connector.uri)
    console.log(index)
    walletConnectClientList.current.splice(index, 1)
    updateConnections()
  }
  const onError = (eventName: string, error: Error, connection: WalletConnectRef) => {
    if (props.onError) {
      props.onError(eventName, error, mapWalletConnectRefToConnection(connection))
      try {
        props.onError(eventName, error, mapWalletConnectRefToConnection(connection))
      } catch (err) {
        props.onError(eventName, error)
      }
    }
  }
  // end of events block

  const activeSession = (uri: string) => {
    const index = getWalletConnectClientIndexByUri(uri)
    if (index === -1) return
    walletConnectClientList.current[index].listening = true
    if (props.onStartListening) {
      props.onStartListening(mapWalletConnectRefToConnection(walletConnectClientList.current[index]))
    }
    updateConnections()
  }

  const endSession = (uri: string) => {
    const index = getWalletConnectClientIndexByUri(uri)
    if (index === -1) return
    walletConnectClientList.current[index].listening = false
    if (props.onStopListening) {
      props.onStopListening(mapWalletConnectRefToConnection(walletConnectClientList.current[index]))
    }
    updateConnections()
  }

  const disconnect = (uri: string) => {
    const index = getWalletConnectClientIndexByUri(uri)
    if (index === -1) return
    walletConnectClientList.current[index].connector.killSession()
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
    let update = false
    connections.forEach((propConnection) => {
      const index = getWalletConnectClientIndexByUri(propConnection.uri)
      if (index === -1) {
        const connection = factoryConnection(propConnection.uri, propConnection.walletConnectClientSession)
        subscribeEvents({
          connection,
          removeWalletConnectItem,
          onSessionUpdate,
          onRequest,
          onDisconnect,
          onError,
        })
        connection.listening = !!propConnection.listening
        walletConnectClientList.current.push(connection)
        update = true
      }
    })
    if (update) forceUpdate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connections])

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      walletConnectClientList.current.forEach(unsubscribeEvents)
    }
  }, [])

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
                NewConnection
              </button>
              <button
                className={`oreIdWalletConnect-modal-btn ${
                  modalConnections === ModalConnections.ListConnections ? 'oreIdWalletConnect-modal-btn-active' : ''
                }`}
                onClick={() => {
                  setModalConnections(ModalConnections.ListConnections)
                }}
              >
                ListConnections
              </button>
            </div>
          )}
          {modalConnections === ModalConnections.NewConnection && (
            <ConnectWalletContainer
              config={config}
              createConnection={createConnection}
              onSessionRequest={onSessionRequest}
              onConnect={onConnect}
              onDisconnect={onDisconnect}
              onError={onError}
            />
          )}
          {modalConnections === ModalConnections.ListConnections && (
            <>
              {connections.map((conection) => {
                const index = getWalletConnectClientIndexByUri(conection.uri)
                const meta = walletConnectClientList.current[index]?.connector?.session?.peerMeta
                if (!meta) return null
                return (
                  <React.Fragment key={conection.uri}>
                    <ConnectionListItem
                      isActivedSession={!!conection.listening}
                      activeSession={() => {
                        activeSession(conection.uri)
                      }}
                      disconnect={() => {
                        disconnect(conection.uri)
                      }}
                      endSession={() => {
                        endSession(conection.uri)
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
              const index = getWalletConnectClientIndexByUri(connection.uri)
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
