import WalletConnectClient from '@walletconnect/client'

export type ConnectionEvent = (connection: Connection, payload?: any) => void

export type WalletConnectRefEvent = (connection: WalletConnectRef, payload?: any) => void

export interface OreIDWalletConnectConfig {
  chainId: number
  accounts: string[]
}

export interface OreIDWalletConnectProps {
  config: OreIDWalletConnectConfig
  connections: Connection[]
  setConnections: (connections: Connection[]) => void
  modalConnections: ModalConnections
  setModalConnections: (modalState: ModalConnections) => void

  // Events
  onSessionRequest?: ConnectionEvent
  onSessionUpdate?: ConnectionEvent
  onConnect?: ConnectionEvent
  onStartListening?: ConnectionEvent
  onRequest: ConnectionEvent
  onStopListening?: ConnectionEvent
  onDisconnect?: ConnectionEvent
  onError?: (eventName: string, error: Error, connection?: Connection) => void
}

export interface PeerMeta {
  description?: string
  url?: string
  icons?: string[]
  name?: string
  ssl?: boolean
}

export interface WalletConnectRef {
  listening: boolean
  subscribed: boolean
  connector: WalletConnectClient
}

export interface StoreSessionWalletConnectClient {
  connected: boolean
  accounts: string[]
  chainId: number
  bridge: string
  key: string
  clientId: string
  clientMeta: any
  peerId: string
  peerMeta: PeerMeta
  handshakeId: number
  handshakeTopic: string
}

export interface Connection {
  listening: boolean
  uri: string
  session: StoreSessionWalletConnectClient
}

export enum ModalConnections {
  Closed,
  NewConnection,
  ListConnections,
}
