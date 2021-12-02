import WalletConnect from '@walletconnect/client'
import { mapConnectionToWalletConnectRefSession } from './mapper'
import { WalletConnectRef, WalletConnectRefEvent, Connection, OreIDWalletConnectConfig } from './types'

export const factoryConnection = (
  uri: string,
  config: OreIDWalletConnectConfig,
  connection?: Connection,
): WalletConnectRef => {
  const storageId = uri.split('key=')[1]
  const session = connection ? mapConnectionToWalletConnectRefSession(connection, config) : undefined
  const connector = new WalletConnect({ uri, storageId, session })
  return {
    subscribed: false,
    listening: false,
    connector,
  }
}

export const subscribeEvents = ({
  connection,
  removeWalletConnectItem,
  onSessionUpdate,
  onRequest,
  onConnectionDelete,
  onError,
}: {
  connection: WalletConnectRef
  removeWalletConnectItem: (uri: string) => void

  // callback for events
  onSessionUpdate: WalletConnectRefEvent
  onRequest: WalletConnectRefEvent
  onConnectionDelete: WalletConnectRefEvent
  onError: (eventName: string, error: Error, connection?: WalletConnectRef) => void
}) => {
  if (!connection.connector.connected) {
    connection.connector.createSession()
  }
  // listen to session_update event
  connection.connector.on('session_update', (error, payload) => {
    if (error) {
      onError('session_update', error)
      return
    }
    onSessionUpdate(connection, payload)
  })
  // listen to call_request event
  connection.connector.on('call_request', (error, payload) => {
    if (error) {
      onError('call_request', error)
      return
    }
    onRequest(connection, payload)
  })
  // listen to disconnect event
  connection.connector.on('disconnect', (error, payload) => {
    if (error) {
      onError('disconnect', error, connection)
      return
    }
    onConnectionDelete(connection, payload)
    removeWalletConnectItem(connection.connector.uri)
  })
}

export const unsubscribeEvents = (connection: WalletConnectRef) => {
  connection.connector.off('session_request')
  connection.connector.off('connect')
  connection.connector.off('session_update')
  connection.connector.off('disconnect')
  connection.connector.off('call_request')
  return connection
}

/** Typescript Typeguard to verify that the value is in the enumType specified  */
export function isInEnum<T>(enumType: T, value: any): value is T[keyof T] {
  return Object.values(enumType).includes(value as T[keyof T])
}

/** Typescript Typeguard helper to ensure that a string value can be assigned to an Enum type
 *  If a value can't be matched to a valid option in the enum, returns null (or throws if throwIfInvalid = true) */
export function toEnumValue<T>(e: T, value: any, throwIfInvalid = false): T[keyof T] | null {
  if (value === null || value === undefined) return null
  if (isInEnum<T>(e, value)) {
    return value
  }
  const errMsg = `Value ${JSON.stringify(value)} is not a valid member of enum ${JSON.stringify(e)}.`
  if (throwIfInvalid) {
    throw new Error(errMsg)
  }
  return null
}
