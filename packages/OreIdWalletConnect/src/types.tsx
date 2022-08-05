import WalletConnectClient from '@walletconnect/client'

export enum ModalConnections {
  Closed,
  NewConnection,
  ListConnections,
  OnRequest,
}

export interface ChainNetworkMap {
  chainNetwork: ChainNetwork
  id: number
  name: string
}

export enum ChainNetwork {
  AlgoMain = 'algo_main',
  AlgoBeta = 'algo_beta',
  AlgoTest = 'algo_test',
  DspEosKylin1 = 'kylin-dsp-1.liquidapps.io',
  DspEosKylin2 = 'kylin-dsp-2.liquidapps.io',
  DspMoonlighting = 'eos_moon_blockstartdsp_com',
  DspMoonlightingTest = 'eos_moontest_blockstartdsp_com',
  EosMain = 'eos_main', // 59
  EosKylin = 'eos_kylin', // 95
  EosJungle = 'eos_jungle',
  EthMain = 'eth_main', // 1
  EthRopsten = 'eth_ropsten', // 3
  EthRinkeby = 'eth_rinkeby', // 4
  MigrateEosMain = 'migrate_eos_main',
  OreMain = 'ore_main',
  OreTest = 'ore_test',
  TelosMain = 'telos_main', // 40
  TelosTest = 'telos_test', // 41
  UxMain = 'ux_main',
  // UxTest = 'ux_test', (there is no test network) - this is left here as a placeholder
  WaxMain = 'wax_main',
  WaxTest = 'wax_test',
  PolygonMain = 'polygon_main',
  PolygonMumbai = 'polygon_mumbai',
}

export enum OreIDWalletConnectSize {
  Wide = 213,
  Medium = 121,
  Small = 73,
}

export type ConnectionEvent = (connection?: Connection, payload?: any) => void
export type WalletConnectRefEvent = (connection: WalletConnectRef, payload?: any) => void

export interface OreIDWalletConnectConfig {
  chainNetwork: ChainNetwork
  account: string
  clientDescription: string
  clientIcons: string[]
  clientUrl: string
  clientName: string
}

export interface OreIDWalletConnectProps {
  config: OreIDWalletConnectConfig
  connections: Connection[]
  setConnections: (connections: Connection[]) => void
  modalConnections: ModalConnections
  setModalConnections: (modalState: ModalConnections) => void
  hideWhenNoConnections?: boolean

  // Events
  onSessionRequest?: ConnectionEvent
  onSessionUpdate?: ConnectionEvent
  onConnectionCreate?: ConnectionEvent
  onConnectionDelete?: ConnectionEvent
  onAcceptRequest: (transaction: WalletConnectTransaction, connection: Connection) => void
  onError?: (eventName: string, error: Error, connection?: Connection) => void
  CustomButton?: React.FC<{ onClick: () => void }>
}

export interface PeerMeta {
  description?: string
  url?: string
  icons?: string[]
  name?: string
  ssl?: boolean
}

export interface WalletConnectRef {
  subscribed: boolean
  connector: WalletConnectClient
}

export interface Connection {
  key: string
  peerId: string
  peerUrl: string
  clientId: string
  chainNetwork: string
  bridge: string
  handshakeId: string
  handshakeTopic: string
  connectionUri: string
  name: string
  description?: string
  logoUrl?: string
}

export interface WalletConnectTransaction {
  id: number
  jsonrpc: string
  method: string
  params: [
    {
      gas: string
      value: string
      from: string
      to: string
      data: string
    },
  ]
}
