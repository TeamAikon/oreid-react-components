import { MuiThemeProvider, Tab, Tabs } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import theme from '../assets/_styles/theme'
import { ConnectionListItem } from '../ConnectionListItem'
import { ConnectionsBadge } from '../ConnectionsBadge'
import { ConnectWalletContainer } from '../ConnectWalletContainer'
import { getSize, hasChainSupport } from '../helpers'
import { mapWalletConnectRefToConnection } from '../mapper'
import { Modal } from '../Modal'
import { RequestWidget } from '../RequestWidget'
import {
  ModalConnections,
  OreIDWalletConnectProps,
  PeerMeta,
  WalletConnectRef,
  WalletConnectRefEvent,
  WalletConnectTransaction,
} from '../types'
import { factoryConnection, subscribeEvents, unsubscribeEvents } from '../utils'
import styles from './OreIDWalletConnect.module.scss'

const useForceUpdate = () => {
  const [value, setValue] = useState(0) // integer state
  return () => setValue(value + 1) // update the state to force render
}

interface Props extends OreIDWalletConnectProps {
  width: number
}

export const OreIDWalletConnect: React.FC<Props> = ({
  config,
  modalConnections,
  setModalConnections,
  connections,
  setConnections,
  hideWhenNoConnections,
  width,
  ...props
}) => {
  const parentSize = getSize(width)
  const walletConnectClientList = useRef<WalletConnectRef[]>([])
  const [incomingRequest, setIncomingRequest] = useState<
    { peerMeta: PeerMeta; request: WalletConnectTransaction; connectionUri: string } | undefined
  >()

  if (!config.clientIcons || !config.clientDescription || !config.clientName) {
    throw Error(`config missing at least one: clientIcons, clientDescription, clientName, clientUrl`)
  }

  if (connections.filter(c => c.chainNetwork !== config.chainNetwork).length) {
    throw Error(`The chainNetwork of the configuration is not the same as the connection`)
  }

  const hasChainNetworkSupport = hasChainSupport(config?.chainNetwork)
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    if (modalConnections === ModalConnections.Closed) {
      setIncomingRequest(undefined)
    }
  }, [modalConnections])

  const getWalletConnectClientIndexByUri = (uri: string): number =>
    walletConnectClientList.current.findIndex(c => c.connector.uri === uri)

  const getCurrentConnectionByUri = (uri?: string) => {
    if (!uri) return undefined
    const current = walletConnectClientList.current.find(c => c.connector.uri === uri)
    if (current) {
      return mapWalletConnectRefToConnection(current)
    }
    return undefined
  }

  const updateConnections = () => setConnections(walletConnectClientList.current.map(mapWalletConnectRefToConnection))

  // // This block is for customizing the events if necessary

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
        props.onConnectionCreate(mapWalletConnectRefToConnection(connection), payload)
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
    if (peerMeta) {
      setIncomingRequest({
        peerMeta,
        request: payload,
        connectionUri: connection.connector.uri,
      })
      setModalConnections(ModalConnections.OnRequest)
    }
  }

  /** Handle errors */
  const onError = (eventName: string, error: Error, connection?: WalletConnectRef) => {
    if (props.onError) {
      const currentConnection = getCurrentConnectionByUri(connection?.connector.uri)
      props.onError(eventName, error, currentConnection)
      try {
        props.onError(eventName, error, currentConnection)
      } catch (err) {
        props.onError(eventName, error)
      }
    }
  }
  // end of events block

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
    connections.forEach(propConnection => {
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

  const handleChange = (_event: any, newValue: number) => {
    setModalConnections(newValue)
  }

  const destroyDuplicateAppConnection = (url?: string) => {
    if (!url) return
    walletConnectClientList.current
      .filter(c => c.connector.peerMeta?.url === url)
      .forEach(c => disconnect(c.connector.uri))
  }

  if (!hasChainNetworkSupport) return null
  return (
    <MuiThemeProvider theme={theme}>
      <div
        className={styles.oreIdWalletConnect}
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <Modal
          open={modalConnections !== ModalConnections.Closed}
          onClose={() => setModalConnections(ModalConnections.Closed)}
          header={modalConnections !== ModalConnections.OnRequest}
        >
          {modalConnections !== ModalConnections.OnRequest && (
            <Tabs
              centered
              variant="fullWidth"
              className={styles.modal}
              textColor="primary"
              indicatorColor="primary"
              value={modalConnections}
              onChange={handleChange}
            >
              <Tab className={styles.tab} label="New Connection" value={ModalConnections.NewConnection} />
              <Tab className={styles.tab} label="Connected Sites" value={ModalConnections.ListConnections} />
            </Tabs>
          )}
          {modalConnections === ModalConnections.NewConnection && (
            <ConnectWalletContainer
              destroyDuplicateAppConnection={destroyDuplicateAppConnection}
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
              <div>
                {connections.map(connection => {
                  const index = getWalletConnectClientIndexByUri(connection.connectionUri)
                  const meta = walletConnectClientList.current[index]?.connector?.session?.peerMeta
                  if (!meta) return null
                  return (
                    <React.Fragment key={connection.connectionUri}>
                      <ConnectionListItem
                        parentSize={parentSize}
                        resetConnection={() => {
                          setModalConnections(ModalConnections.NewConnection)
                        }}
                        disconnect={() => {
                          disconnect(connection.connectionUri)
                        }}
                        peerMeta={meta}
                      />
                    </React.Fragment>
                  )
                })}
              </div>

              {connections.length > 0 && (
                <div className={styles.reconnection}>
                  Having problems connecting? Try
                  <button
                    className={styles.btn}
                    onClick={() => {
                      setModalConnections(ModalConnections.NewConnection)
                    }}
                  >
                    Reset Connection
                  </button>
                </div>
              )}
            </>
          )}
          {modalConnections === ModalConnections.OnRequest && incomingRequest && (
            <RequestWidget
              {...incomingRequest}
              onAcceptRequest={request => {
                const currentConnection = getCurrentConnectionByUri(incomingRequest.connectionUri)
                if (!currentConnection) throw new Error(`Invalid connection uri: ${incomingRequest.connectionUri}`)
                props.onAcceptRequest(request, currentConnection)
                setModalConnections(ModalConnections.Closed)
              }}
            />
          )}
        </Modal>
        <ConnectionsBadge
          CustomButton={props.CustomButton}
          parentSize={parentSize}
          hideWhenNoConnections={!!hideWhenNoConnections}
          peerMeta={connections
            .map(connection => {
              const index = getWalletConnectClientIndexByUri(connection.connectionUri)
              return walletConnectClientList.current[index]?.connector.session.peerMeta as PeerMeta
            })
            .filter(peerMeta => !!peerMeta)}
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
