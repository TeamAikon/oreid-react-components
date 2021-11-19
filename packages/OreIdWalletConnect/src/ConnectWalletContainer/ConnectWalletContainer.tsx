import React, { useState, useEffect } from 'react'
import { ApproveConnectionWidget } from '../ApproveConnectionWidget'
import { ConnectWalletWidget } from '../ConnectWalletWidget'
import { Loading } from '../Loading'
import { mapChainNetworkToChainId } from '../mapper'

import { OreIDWalletConnectConfig, WalletConnectRefEvent, WalletConnectRef } from '../types'
import { factoryConnection } from '../utils'

enum WalletContainerState {
  WaitingUri,
  LoadingScreen,
  Confirm,
}

interface ConnectWalletContainerProps {
  config: OreIDWalletConnectConfig
  createConnection: (walletConnectRef: WalletConnectRef) => void
  onSessionRequest: WalletConnectRefEvent
  onConnectionCreate: WalletConnectRefEvent
  onConnectionDelete: WalletConnectRefEvent
  onError: (eventName: string, error: Error, connection?: WalletConnectRef) => void
}

export const ConnectWalletContainer: React.FC<ConnectWalletContainerProps> = ({
  config,
  createConnection,
  onSessionRequest,
  onConnectionCreate,
  onConnectionDelete,
  onError,
}) => {
  const [connection, setConnection] = useState<WalletConnectRef | undefined>()
  const [state, setState] = useState<WalletContainerState>(WalletContainerState.WaitingUri)

  const connect = (uri: string) => {
    const update = factoryConnection(uri, config)
    setConnection(update)
    setState(WalletContainerState.LoadingScreen)
  }

  useEffect(() => {
    if (!connection) return
    if (!connection.subscribed) {
      connection.connector.createSession()
      // listen to session_request event
      connection.connector.on('session_request', (error, payload) => {
        if (error) {
          onError('session_request', error)
          return
        }
        onSessionRequest(connection, payload)
        setState(WalletContainerState.Confirm)
      })
      // listen to connect event - this happens on a new request to connect to app
      connection.connector.on('connect', (error, payload) => {
        if (error) {
          onError('connect', error)
          return
        }
        onConnectionCreate(connection, payload)
      })
      // listen to disconnect event
      connection.connector.on('disconnect', (error, payload) => {
        if (error) {
          onError('disconnect', error, connection)
          return
        }
        onConnectionDelete(connection, payload)
      })
      setConnection({ ...connection, subscribed: true })
    }
  }, [connection, onConnectionCreate, onConnectionDelete, onError, onSessionRequest])

  useEffect(() => {
    return () => {
      if (connection) {
        connection.connector.off('session_request')
        connection.connector.off('connect')
        connection.connector.off('disconnect')
      }
    }
  }, [connection])

  if (state === WalletContainerState.WaitingUri) {
    return <ConnectWalletWidget onClickConect={connect} />
  }
  if (state === WalletContainerState.LoadingScreen || !connection?.connector.session.peerMeta) {
    return <Loading />
  }

  return (
    <ApproveConnectionWidget
      address={config.account}
      peerMeta={connection.connector.session.peerMeta}
      approveSessionRequest={() => {
        if (connection) {
          const { chainNetwork, account } = config
          const configConnection = {
            chainId: mapChainNetworkToChainId(chainNetwork),
            accounts: [account],
          }
          connection.connector.approveSession(configConnection)
          connection.connector.off('session_request')
          connection.connector.off('connect')
          connection.connector.off('disconnect')
          connection.listening = true
          createConnection(connection)
        }
      }}
    />
  )
}
