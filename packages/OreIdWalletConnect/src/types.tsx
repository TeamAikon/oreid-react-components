import WalletConnect from '@walletconnect/client'

export type WalletConnectClient = WalletConnect

export interface OreIDWalletConnectProps {
  config: AppConfig
  connectUris: string[]
  sessions?: any[]
  activeSession: string
  activePage: ActivePage
  setActivePage: Function
  onWalletConnectButtonClick: Function
  onWalletConnectURIPaste: Function
  onSessionRequest: Function
  onSessionUpdate: Function
  onSessionDisconnect: Function
  onChangeActiveClient: Function
  onTransaction: Function
  onPersonalSign: Function
  onConnect: Function
  onError: Function
}

export type PeerMeta = {
  description?: string
  url?: string
  icons?: string[]
  name?: string
  ssl?: boolean
}

export interface AppConfig {
  peerMeta?: PeerMeta
  chainId: number
  accounts: string[]
  address: string
}

export type ConnectedClient = {
  uri: string
  connector: WalletConnectClient
  peerMeta?: PeerMeta
}

export type ConnectedClients = ConnectedClient[]

export enum ActivePage {
  Empty = 'Empty',
  Active = 'Active',
  Loading = 'Loading',
  Connect = 'Connect',
  ApproveSession = 'ApproveSession',
  Connected = 'Connected',
  Listening = 'Listening',
  Error = 'Error',
  SignTransaction = 'SignTransaction',
  SignMessage = 'SignMessage',
  Disconnected = 'Disconnected',
}
