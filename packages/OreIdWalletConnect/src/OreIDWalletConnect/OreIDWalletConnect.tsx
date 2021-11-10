import React, { useEffect, useRef } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import theme from '../assets/_styles/theme'

import { Modal } from '../Modal'
import { ConnectWalletContainer } from '../ConnectWalletContainer'
import { ModalConnections, OreIDWalletConnectProps, WalletConnectRefEvent, WalletConnectRef } from '../types'

import './OreIDWalletConnect.scss'
import { factoryConnection, subscribeEvents, unsubscribeEvents } from '../utils'
import { ConnectionListItem } from '../ConnectionListItem'
import { ConnectionsBadge } from '../ConnectionsBadge'
import { storeSession } from '../sessions'

export const OreIDWalletConnect: React.FC<OreIDWalletConnectProps> = ({
  config,
  modalConnections,
  setModalConnections,
  connections,
  setConnections,
  ...props
}) => {
  const walletConnectClientList = useRef<WalletConnectRef[]>([])

  const getWalletConnectClientIndexByUri = (uri: string): number =>
    walletConnectClientList.current.findIndex((c) => c.connector.uri === uri)

  // This block is for customizing the events if necessary
  const onSessionRequest: WalletConnectRefEvent = (connection, payload) => {
    if (props.onSessionRequest) {
      props.onSessionRequest(storeSession(connection), payload)
    }
  }
  const onConnect: WalletConnectRefEvent = (connection, payload) => {
    if (props.onConnect) {
      props.onConnect(storeSession(connection), payload)
    }
  }

  const onSessionUpdate: WalletConnectRefEvent = (connection, payload) => {
    if (props.onSessionUpdate) {
      props.onSessionUpdate(storeSession(connection), payload)
    }
  }
  const onRequest: WalletConnectRefEvent = (connection, payload) => {
    const index = getWalletConnectClientIndexByUri(connection.connector.uri)
    if (walletConnectClientList.current[index].listening) {
      props.onRequest(storeSession(walletConnectClientList.current[index]), payload)
    }
  }
  const onDisconnect: WalletConnectRefEvent = (connection, payload) => {
    if (props.onDisconnect) {
      props.onDisconnect(storeSession(connection), payload)
    }
  }
  const onError = (eventName: string, error: Error, connection: WalletConnectRef) => {
    if (props.onError) {
      props.onError(eventName, error, storeSession(connection))
    }
  }
  // end of events block

  const activeSession = (uri: string) => {
    const index = getWalletConnectClientIndexByUri(uri)
    if (index === -1) return
    walletConnectClientList.current[index].listening = true
    if (props.onStartListening) {
      props.onStartListening(storeSession(walletConnectClientList.current[index]))
      const update = connections.map((c) => {
        if (c.uri !== uri) return c
        return { ...c, listening: true }
      })
      setConnections(update)
    }
  }

  const endSession = (uri: string) => {
    const index = getWalletConnectClientIndexByUri(uri)
    if (index === -1) return
    walletConnectClientList.current[index].listening = false
    if (props.onStopListening) {
      props.onStopListening(storeSession(walletConnectClientList.current[index]))
      const update = connections.map((c) => {
        if (c.uri !== uri) return c
        return { ...c, listening: false }
      })
      setConnections(update)
    }
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
    setConnections(connections.filter((c) => c.uri !== uri))
  }

  const createConnection = (walletConnectRef: WalletConnectRef) => {
    setModalConnections(ModalConnections.Closed)
    setConnections([...connections, storeSession(walletConnectRef)])
  }

  useEffect(() => {
    connections.forEach((propConnection) => {
      const index = getWalletConnectClientIndexByUri(propConnection.uri)
      if (index === -1) {
        const connection = factoryConnection(propConnection.uri)
        subscribeEvents({
          connection,
          removeWalletConnectItem,
          onSessionUpdate,
          onRequest,
          onDisconnect,
          onError,
        })
        walletConnectClientList.current.push(connection)
      }
    })
  }, [connections])

  useEffect(() => {
    return () => {
      walletConnectClientList.current.forEach(unsubscribeEvents)
    }
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <div className="oreIdWalletConnect">
        <Modal
          open={modalConnections !== ModalConnections.Closed}
          onClose={() => setModalConnections(ModalConnections.Closed)}
          header
        >
          <div>
            <button
              onClick={() => {
                setModalConnections(ModalConnections.NewConnection)
              }}
            >
              NewConnection
            </button>
            <button
              onClick={() => {
                setModalConnections(ModalConnections.ListConnections)
              }}
            >
              ListConnections
            </button>
          </div>
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
              {connections.map((conection) => (
                <React.Fragment key={conection.uri}>
                  {conection.session.peerMeta && (
                    <ConnectionListItem
                      isActivedSession={conection.listening}
                      activeSession={() => {
                        activeSession(conection.uri)
                      }}
                      disconnect={() => {
                        disconnect(conection.uri)
                      }}
                      endSession={() => {
                        endSession(conection.uri)
                      }}
                      peerMeta={conection.session.peerMeta}
                    />
                  )}
                </React.Fragment>
              ))}
            </>
          )}
        </Modal>
        <ConnectionsBadge
          sessions={connections.filter((connection) => connection.listening).map((connection) => connection.session)}
          onClick={() => {
            setModalConnections(ModalConnections.ListConnections)
          }}
        />
      </div>
    </MuiThemeProvider>
  )
}
