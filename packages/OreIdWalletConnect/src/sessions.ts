import WalletConnect from '@walletconnect/client'
import { Connection, WalletConnectRef } from './types'

export const storeSession = (conection: WalletConnectRef): Connection => {
  const { session } = conection.connector
  return {
    session,
    listening: conection.listening,
    uri: conection.connector.uri,
  }
}

export const restoreSession = (restoredConnection: Connection): WalletConnectRef => {
  const { session, listening, uri } = restoredConnection
  const storageId = uri.split('key=')[1]
  const connector = new WalletConnect({ session, storageId })
  return { connector, listening, subscribed: false }
}
