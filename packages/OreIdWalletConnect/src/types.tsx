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

/** Supported chain networks */
export enum ChainNetwork {
  // Algo
  AlgoMain = 'algo_main',
  AlgoBeta = 'algo_beta',
  AlgoTest = 'algo_test',
  // AVALANCHE
  AvalancheC_Main = 'avalanchec_main',
  AvalancheC_Fuji = 'avalanchec_fuji',
  // Dsp/EOS
  DspEosKylin1 = 'kylin-dsp-1.liquidapps.io',
  DspEosKylin2 = 'kylin-dsp-2.liquidapps.io',
  DspMoonlighting = 'eos_moon_blockstartdsp_com',
  DspMoonlightingTest = 'eos_moontest_blockstartdsp_com',
  // DOS
  DosMain = 'dos_main',
  DosTest = 'dos_test',
  // ETH
  EthMain = 'eth_main',
  EthRopsten = 'eth_ropsten',
  EthRinkeby = 'eth_rinkeby',
  EthGoerli = 'eth_goerli',
  // EOS
  EosMain = 'eos_main',
  EosKylin = 'eos_kylin',
  EosJungle = 'eos_jungle',
  MigrateEosMain = 'migrate_eos_main',
  // ORE
  OreMain = 'ore_main',
  OreTest = 'ore_test',
  // Polygon
  PolygonMain = 'polygon_main',
  PolygonMumbai = 'polygon_mumbai',
  // TELOS
  TelosMain = 'telos_main',
  TelosTest = 'telos_test',
  // TELOS EVM
  TelosEvmMain = 'telosevm_main',
  TelosEvmTest = 'telosevm_test',
  // UX
  UxMain = 'ux_main',
  // UxTest = 'ux_test', (there is no test network) - this is left here as a placeholder
  // WAX
  WaxMain = 'wax_main',
  WaxTest = 'wax_test',
}

export enum OreIDWalletConnectSize {
  Wide = 213,
  Medium = 121,
  Small = 51,
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
