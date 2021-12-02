import React, { useState, useEffect, useRef } from 'react'
import { ApproveConnectionWidget } from '../ApproveConnectionWidget'
import { ConnectWalletWidget } from '../ConnectWalletWidget'
import { useErrorHandler } from '../hooks/useErrorHandler'
import { Loading } from '../Loading'
import { mapChainNetworkToChainId, mapChainNetworkToName } from '../mapper'

import { OreIDWalletConnectConfig, WalletConnectRefEvent, WalletConnectRef } from '../types'
import { factoryConnection } from '../utils'

enum WalletContainerState {
  WaitingUri,
  LoadingScreen,
  Confirm,
}

interface ConnectWalletContainerProps {
  config: OreIDWalletConnectConfig
  clearConnectionApp: (app?: string) => void
  createConnection: (walletConnectRef: WalletConnectRef) => void
  onSessionRequest: WalletConnectRefEvent
  onConnectionCreate: WalletConnectRefEvent
  onConnectionDelete: WalletConnectRefEvent
  onError: (eventName: string, error: Error, connection?: WalletConnectRef) => void
}

export const ConnectWalletContainer: React.FC<ConnectWalletContainerProps> = ({
  config,
  clearConnectionApp,
  createConnection,
  onSessionRequest,
  onConnectionCreate,
  onConnectionDelete,
  onError,
}) => {
  const [connection, setConnection] = useState<WalletConnectRef | undefined>()
  const [state, setState] = useState<WalletContainerState>(WalletContainerState.WaitingUri)
  const [localError, setLocalError, clearLocalError] = useErrorHandler()
  const loadingCounter = useRef<NodeJS.Timeout | undefined>()

  const connect = (uri: string) => {
    try {
      const update = factoryConnection(uri, config)
      setConnection(update)
      setState(WalletContainerState.LoadingScreen)
      loadingCounter.current = setTimeout(() => {
        setConnection(undefined)
        setState(WalletContainerState.WaitingUri)
        setLocalError('Connection timeout, please try again')
      }, 6000)
    } catch (e) {
      setConnection(undefined)
      setState(WalletContainerState.WaitingUri)
      if (e.message === 'URI format is invalid') {
        setLocalError('URI format is invalid')
      }
    }
  }

  useEffect(() => {
    if (!connection) return
    if (!connection.subscribed) {
      connection.connector.createSession().catch((err) => {
        setConnection(undefined)
        setState(WalletContainerState.WaitingUri)

        if (err.message === 'Session currently connected') {
          setLocalError('This uri has already been used')
          return
        }
        setLocalError('An error occurred while trying to connect with wallet connect')
      })
      // listen to session_request event
      connection.connector.on('session_request', (error, payload) => {
        if (error) {
          onError('session_request', error)
          setState(WalletContainerState.WaitingUri)
          return
        }
        if (loadingCounter.current) {
          clearTimeout(loadingCounter.current)
          loadingCounter.current = undefined
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

        if (connection.connector.session.chainId !== mapChainNetworkToChainId(config.chainNetwork)) {
          const app = connection.connector.peerMeta?.name || 'app'
          connection?.connector?.killSession()
          setConnection(undefined)
          setState(WalletContainerState.WaitingUri)
          setLocalError(
            `This connection url is for a different blockchain network. Please change the network on ${app} to match ${mapChainNetworkToName(
              config.chainNetwork,
            )} and try again`,
          )
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

    // IMPORTANT: Must remain only [connection] below or will silently fail
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection])

  useEffect(() => {
    return () => {
      if (connection) {
        connection.connector.off('session_request')
        connection.connector.off('connect')
        connection.connector.off('disconnect')
      }
    }
    // IMPORTANT: Must remain an empty array below or will silently fail
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (state === WalletContainerState.WaitingUri) {
    return (
      <ConnectWalletWidget
        errorMessage={localError}
        onClickConect={(uir: string) => {
          clearLocalError()
          connect(uir)
        }}
      />
    )
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

          clearConnectionApp(connection.connector.session.peerMeta?.url)

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
