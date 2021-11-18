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
  onConnect: WalletConnectRefEvent
  onDisconnect: WalletConnectRefEvent
  onError: (eventName: string, error: Error, connection?: WalletConnectRef) => void
}

export const ConnectWalletContainer: React.FC<ConnectWalletContainerProps> = ({
  config,
  createConnection,
  onSessionRequest,
  onConnect,
  onDisconnect,
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
      connection.connector.on('session_request', (error, payload) => {
        if (error) {
          onError('session_request', error)
          return
        }
        onSessionRequest(connection, payload)
        setState(WalletContainerState.Confirm)
      })
      connection.connector.on('connect', (error, payload) => {
        if (error) {
          onError('connect', error)
          return
        }
        onConnect(connection, payload)
      })
      connection.connector.on('disconnect', (error, payload) => {
        if (error) {
          onError('disconnect', error, connection)
          return
        }
        onDisconnect(connection, payload)
      })
      setConnection({ ...connection, subscribed: true })
    }
  }, [connection])

  useEffect(() => {
    return () => {
      if (connection) {
        connection.connector.off('session_request')
        connection.connector.off('connect')
        connection.connector.off('disconnect')
      }
    }
  }, [])

  if (state === WalletContainerState.WaitingUri) {
    return <ConnectWalletWidget onClickConect={connect} />
  }
  if (state === WalletContainerState.LoadingScreen || !connection?.connector.session.peerMeta) {
    return <Loading />
  }

  return (
    <ApproveConnectionWidget
      address="___address___"
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
