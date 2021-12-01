import WalletConnectClient from '@walletconnect/client'
import { JsonRpc } from '@walletconnect/types'

interface WalletConnectSession {
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

export enum ModalConnections {
  Closed,
  NewConnection,
  ListConnections,
  OnRequest,
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
  MigrateEosMain = 'migrate_eos_main',
  TelosMain = 'telos_main', // 40
  TelosTest = 'telos_test', // 41
  WaxMain = 'wax_main',
  WaxTest = 'wax_test',
  OreMain = 'ore_main',
  OreTest = 'ore_test',
  EthMain = 'eth_main', // 1
  EthRopsten = 'eth_ropsten', // 3
  EthRinkeby = 'eth_rinkeby', // 4
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

  // Events
  onSessionRequest?: ConnectionEvent
  onSessionUpdate?: ConnectionEvent
  onConnectionCreate?: ConnectionEvent
  onConnectionDelete?: ConnectionEvent
  onStartListening?: ConnectionEvent
  onStopListening?: ConnectionEvent
  onAcceptRequest: (transaction: WalletConnectTransaction, connection: Connection) => void
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

export interface Connection extends WalletConnectSession {
  listening?: boolean // add need this type
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
