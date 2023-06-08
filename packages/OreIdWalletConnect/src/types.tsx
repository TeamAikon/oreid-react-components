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
  DosMain = 'dos_main', // 7979
  DosTest = 'dos_test', // 1311
  // ETH
  EthMain = 'eth_main', // 1
  EthRopsten = 'eth_ropsten', // 3
  EthRinkeby = 'eth_rinkeby', // 4
  EthGoerli = 'eth_goerli', // 5
  // EOS
  EosMain = 'eos_main', // 59
  EosKylin = 'eos_kylin', // 95
  EosJungle = 'eos_jungle',
  MigrateEosMain = 'migrate_eos_main',
  // ORE
  OreMain = 'ore_main',
  OreTest = 'ore_test',
  // Polygon
  PolygonMain = 'polygon_main',
  PolygonMumbai = 'polygon_mumbai',
  // TELOS
  TelosMain = 'telos_main', // 40
  TelosTest = 'telos_test', // 41
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

export type ConnectionEvent = (connection?: Connection, payload?: WalletConnectActionRequest) => void
export type WalletConnectRefEvent = (connection: WalletConnectRef, payload?: WalletConnectActionRequest) => void

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
  onAcceptRequest: (transaction: WalletConnectActionRequest, connection: Connection) => void
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

/** Action (methods) defined by WalletConnect */
export enum WalletConnectAction {
  WalletSwitchEthereumChain = 'wallet_switchEthereumChain',
  EthSendTransaction = 'eth_sendTransaction',
  EthSignTransaction = 'eth_signTransaction',
  PersonalSign = 'personal_sign',
  EthSign = 'eth_sign',
  EthSignTypedData = 'eth_signTypedData',
}

export type WalletConnectActionRequest =
  | ActionEthSignTransactionRequest
  | ActionEthSendTransactionRequest
  | ActionPersonalSignRequest
  | ActionEthSignRequest
  | ActionSignTypedDataRequest

// WalletConnect docs - https://docs.walletconnect.com/1.0/json-rpc-api-methods/ethereum#eth_signtransaction

// Request
// {
//   "id": 1,
//   "jsonrpc": "2.0",
//   "method": "eth_signTransaction",
//   "params":[{see below}],
// }
export interface ActionEthSignTransactionRequest {
  id: number
  jsonrpc: string
  method: string
  params: [EthTransaction]
}
export interface EthTransaction {
  from: string
  to: string
  data: string
  gas: string
  gasPrice: string
  value: string
  nonce: string
}
// Result
// {
//   "id": 1,
//   "jsonrpc": "2.0",
//   "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
// }
export interface ActionEthSignTransactionResult {
  id: number
  jsonrpc: string
  result: string
}

// Request
// {
//   "id": 1,
//   "jsonrpc": "2.0",
//   "method": "eth_sendTransaction",
//   "params":[{see above}],
// }
export interface ActionEthSendTransactionRequest {
  id: number
  jsonrpc: string
  method: string
  params: [EthTransaction]
}
// Result
// {
//   "id": 1,
//   "jsonrpc": "2.0",
//   "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
// }
export interface ActionEthSendTransactionResult {
  id: number
  jsonrpc: string
  result: string
}

// Request
// {
//   "id": 1,
//   "jsonrpc": "2.0",
//   "method": "personal_sign",
//   "params":["0xdeadbeaf","0x9b2055d370f73ec7d8a03e965129118dc8f5bf83"],
// }
export interface ActionPersonalSignRequest {
  id: number
  jsonrpc: string
  method: string
  params: [messageToSign: string, address: string]
}
// Result
// {
//   "id": 1,
//   "jsonrpc": "2.0",
//   "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
// }
export interface ActionPersonalSignResponse {
  id: number
  jsonrpc: string
  result: string
}

// // Request
// {
//   "id": 1,
//   "jsonrpc": "2.0",
//   "method": "eth_sign",
//   "params": ["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],
// }
export interface ActionEthSignRequest {
  id: number
  jsonrpc: string
  method: string
  params: [address: string, messageToSign: string]
}
// Result
// {
//   "id": 1,
//   "jsonrpc": "2.0",
//   "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
// }
export interface ActionEthSignResponse {
  id: number
  jsonrpc: string
  result: string
}

// Wallet Connect docs - https://docs.walletconnect.com/1.0/json-rpc-api-methods/ethereum#eth_signtypeddata

// Request
// {
//   "id": 1,
//   "jsonrpc": "2.0",
//   "method": "eth_signTypedData",
//   "params": ["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", {see below}],
// }
export type ActionSignTypedDataRequest = {
  id: number
  jsonrpc: string
  method: string
  params: [address: string, messageToSign: typeof SignTypedDataInputModel]
}
export const SignTypedDataInputModel = {
  version: 0,
  types: {},
  primaryType: '',
  domain: {},
  message: {},
}
// Result
// {
//   "id": 1,
//   "jsonrpc": "2.0",
//   "result": "0x4355c47d63924e8a72e509b65029052eb6c299d53a04e167c5775fd466751c9d07299936d304c153f6443dfa05f40ff007d72911b6f72307f996231605b915621c"
// }
export interface ActionSignTypedDataResponse {
  id: number
  jsonrpc: string
  result: string
}
